const express     = require("express");
const db          = require("../db/database");
const verifyToken = require("../middleware/auth");
const router      = express.Router();

// GET /api/rooms
router.get("/", verifyToken, (req, res) => {
  try {
    const { branch } = req.query;

    const rows = branch
      ? db.prepare("SELECT * FROM rooms WHERE branch = ? ORDER BY name").all(branch)
      : db.prepare("SELECT * FROM rooms ORDER BY name").all();

    res.json(rows);
  } catch (err) {
    console.error("GET /rooms error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rooms/:id
router.get("/:id", verifyToken, (req, res) => {
  try {
    const room = db.prepare("SELECT * FROM rooms WHERE id = ?").get(Number(req.params.id));
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;