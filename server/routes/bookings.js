const express     = require("express");
const db          = require("../db/database");
const verifyToken = require("../middleware/auth");
const router      = express.Router();

// ── GET /api/bookings ─────────────────────────────────────────
router.get("/", verifyToken, (req, res) => {
  console.log("📦 BODY:", JSON.stringify(req.body));   // ← ADD THIS
  console.log("👤 USER:", JSON.stringify(req.user));   // ← ADD THIS
  const { date, branch } = req.query;

  let query = `
    SELECT 
      b.id,
      b.room_id,
      b.subject,
      b.batch,
      b.branch,
      b.date,
      b.start_time,
      b.end_time,
      b.capacity,
      b.priority,
      r.name  AS room_name,
      r.building,
      u.name  AS teacher_name
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN users u ON b.user_id = u.id
    WHERE b.user_id = ?
  `;
  const params = [req.user.id];

  if (date)   { query += " AND b.date = ?";   params.push(date);   }
  if (branch) { query += " AND b.branch = ?"; params.push(branch); }

  query += " ORDER BY b.date, b.start_time";

  try {
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  } catch (err) {
    console.error("[GET /bookings]", err);
    res.status(500).json({ error: "Failed to fetch bookings", detail: err.message });
  }
});

// ── POST /api/bookings ────────────────────────────────────────
router.post("/", verifyToken, (req, res) => {
  const {
    room_id,
    subject,
    batch,
    branch,
    date,
    start_time,
    end_time,
    capacity,
  } = req.body;

  // ── Validate required fields ──────────────────────────────
  if (!room_id || !subject || !batch || !branch || !date || !start_time || !end_time || !capacity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // ── FIX 1: Coerce types so SQLite doesn't reject them ─────
  const roomIdInt   = parseInt(room_id, 10);
  const capacityInt = parseInt(capacity, 10);

  if (isNaN(roomIdInt)) {
    return res.status(400).json({ error: `Invalid room_id: "${room_id}"` });
  }
  if (isNaN(capacityInt) || capacityInt < 1) {
    return res.status(400).json({ error: `Invalid capacity: "${capacity}"` });
  }

  // ── FIX 2: Validate time ordering ────────────────────────
  if (start_time >= end_time) {
    return res.status(400).json({ error: "start_time must be before end_time." });
  }

  // ── FIX 3: Derive priority from JWT role ──────────────────
  const priority = req.user.role === "teacher" ? 0 : 1;

  try {
    // ── Conflict check ──────────────────────────────────────
    const conflict = db.prepare(`
      SELECT b.id, r.name AS room_name, b.start_time, b.end_time
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      WHERE b.room_id = ?
        AND b.date     = ?
        AND b.start_time < ?
        AND b.end_time   > ?
    `).get(roomIdInt, date, end_time, start_time);

    if (conflict) {
      return res.status(409).json({
        error: `"${conflict.room_name}" is already booked from ${conflict.start_time}–${conflict.end_time}`,
      });
    }

    // ── Verify the room actually exists ─────────────────────
    const room = db.prepare("SELECT id, name FROM rooms WHERE id = ?").get(roomIdInt);
    if (!room) {
      return res.status(404).json({ error: `Room with id ${roomIdInt} not found.` });
    }

    // ── Insert ──────────────────────────────────────────────
    const result = db.prepare(`
      INSERT INTO bookings
        (room_id, user_id, subject, batch, branch, date, start_time, end_time, capacity, priority)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(roomIdInt, req.user.id, subject, batch, branch, date, start_time, end_time, capacityInt, priority);

    res.status(201).json({
      id:      result.lastInsertRowid,
      message: "Booking created",
    });

  } catch (err) {
    console.error("[POST /bookings]", err);
    res.status(500).json({ error: "Failed to create booking", detail: err.message });
  }
});

// ── DELETE /api/bookings/:id ──────────────────────────────────
router.delete("/:id", verifyToken, (req, res) => {
  // ── FIX 4: Coerce id to integer ───────────────────────────
  const bookingId = parseInt(req.params.id, 10);
  if (isNaN(bookingId)) {
    return res.status(400).json({ error: "Invalid booking id." });
  }

  try {
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // ── FIX 5: Only owner (or admin) can delete ───────────────
    if (booking.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "You can only cancel your own bookings." });
    }

    db.prepare("DELETE FROM bookings WHERE id = ?").run(bookingId);
    res.json({ message: "Booking cancelled." });

  } catch (err) {
    console.error("[DELETE /bookings/:id]", err);
    res.status(500).json({ error: "Failed to cancel booking", detail: err.message });
  }
});

module.exports = router;