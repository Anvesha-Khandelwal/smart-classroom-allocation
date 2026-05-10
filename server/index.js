const express  = require("express");
const cors     = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(express.json());

// Routes
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/rooms",    require("./routes/rooms"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));