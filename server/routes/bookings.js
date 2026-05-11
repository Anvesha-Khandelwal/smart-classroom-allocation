const express     = require("express");
const db          = require("../db/database");
const verifyToken = require("../middleware/auth");
const router      = express.Router();

// GET /api/bookings
router.get("/", verifyToken, (req, res) => {
  try {
    const { date, branch } = req.query;

    let query = `
      SELECT
        b.id,
        b.subject,
        b.batch,
        b.branch,
        b.date,
        b.start_time,
        b.end_time,
        b.capacity,
        b.priority,
        b.created_at,
        r.id   AS room_id,
        r.name AS room_name,
        r.building,
        r.floor,
        u.name AS teacher_name
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      JOIN users u ON b.user_id = u.id
      WHERE 1=1
    `;

    const params = [];
    if (date)   { query += " AND b.date = ?";   params.push(date);   }
    if (branch) { query += " AND b.branch = ?"; params.push(branch); }
    query += " ORDER BY b.date DESC, b.start_time ASC";

    const rows = params.length > 0
      ? db.prepare(query).all(params)
      : db.prepare(query).all();

    res.json(rows);
  } catch (err) {
    console.error("GET /bookings error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/bookings
router.post("/", verifyToken, (req, res) => {
  try {
    const { room_id, subject, batch, branch, date, start_time, end_time, capacity } = req.body;
    const priority = req.user.role === "teacher" ? 0 : 1;

    if (!room_id || !subject || !batch || !branch || !date || !start_time || !end_time || !capacity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find room — accepts both integer id and string name like "NB-101"
    let dbRoom;
    if (isNaN(room_id)) {
      dbRoom = db.prepare("SELECT * FROM rooms WHERE name = ?").get(String(room_id));
    } else {
      dbRoom = db.prepare("SELECT * FROM rooms WHERE id = ?").get(Number(room_id));
    }

    if (!dbRoom) {
      return res.status(404).json({ error: `Room not found: "${room_id}"` });
    }

    // Conflict check
    const conflict = db.prepare(`
      SELECT b.id, r.name as room_name, b.start_time, b.end_time
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      WHERE b.room_id = ? AND b.date = ? AND b.start_time < ? AND b.end_time > ?
    `).get(dbRoom.id, date, end_time, start_time);

    if (conflict) {
      return res.status(409).json({
        error: `${dbRoom.name} is already booked from ${conflict.start_time}–${conflict.end_time}`,
        conflict
      });
    }

    const result = db.prepare(`
      INSERT INTO bookings (room_id, user_id, subject, batch, branch, date, start_time, end_time, capacity, priority)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(dbRoom.id, req.user.id, subject, batch, branch, date, start_time, end_time, capacity, priority);

    res.status(201).json({
      id:        result.lastInsertRowid,
      room_name: dbRoom.name,
      room_id:   dbRoom.id,
      message:   "Booking created successfully"
    });
  } catch (err) {
    console.error("POST /bookings error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/bookings/:id
router.delete("/:id", verifyToken, (req, res) => {
  try {
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(Number(req.params.id));
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    db.prepare("DELETE FROM bookings WHERE id = ?").run(Number(req.params.id));
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("DELETE /bookings error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;