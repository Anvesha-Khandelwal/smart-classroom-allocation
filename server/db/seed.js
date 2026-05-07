const db = require("./database");

const rooms = [
  // CSE - NB Block
  { name: "NB-101", building: "Building 19 (NB Block)", floor: 1, capacity: 60,  branch: "CSE" },
  { name: "NB-102", building: "Building 19 (NB Block)", floor: 1, capacity: 60,  branch: "CSE" },
  { name: "NB-103", building: "Building 19 (NB Block)", floor: 1, capacity: 40,  branch: "CSE" },
  { name: "NB-201", building: "Building 19 (NB Block)", floor: 2, capacity: 60,  branch: "CSE" },
  { name: "NB-202", building: "Building 19 (NB Block)", floor: 2, capacity: 60,  branch: "CSE" },
  { name: "NB-203", building: "Building 19 (NB Block)", floor: 2, capacity: 40,  branch: "CSE" },
  { name: "NB-301", building: "Building 19 (NB Block)", floor: 3, capacity: 80,  branch: "CSE" },
  { name: "NB-302", building: "Building 19 (NB Block)", floor: 3, capacity: 60,  branch: "CSE" },
  // ISE - NB Block
  { name: "NB-104", building: "Building 19 (NB Block)", floor: 1, capacity: 60,  branch: "ISE" },
  { name: "NB-204", building: "Building 19 (NB Block)", floor: 2, capacity: 60,  branch: "ISE" },
  { name: "NB-304", building: "Building 19 (NB Block)", floor: 3, capacity: 40,  branch: "ISE" },
  // AIML - NB Block
  { name: "NB-105", building: "Building 19 (NB Block)", floor: 1, capacity: 60,  branch: "AIML" },
  { name: "NB-205", building: "Building 19 (NB Block)", floor: 2, capacity: 60,  branch: "AIML" },
  { name: "NB-305", building: "Building 19 (NB Block)", floor: 3, capacity: 40,  branch: "AIML" },
  // MATHS_DS - Building 4
  { name: "B4-101", building: "Building 4", floor: 1, capacity: 60,  branch: "MATHS_DS" },
  { name: "B4-102", building: "Building 4", floor: 1, capacity: 60,  branch: "MATHS_DS" },
  { name: "B4-201", building: "Building 4", floor: 2, capacity: 80,  branch: "MATHS_DS" },
  { name: "B4-202", building: "Building 4", floor: 2, capacity: 40,  branch: "MATHS_DS" },
  { name: "B4-301", building: "Building 4", floor: 3, capacity: 60,  branch: "MATHS_DS" },
  // EEE - Building 17
  { name: "B17-101", building: "Building 17", floor: 1, capacity: 60, branch: "EEE" },
  { name: "B17-102", building: "Building 17", floor: 1, capacity: 60, branch: "EEE" },
  { name: "B17-201", building: "Building 17", floor: 2, capacity: 80, branch: "EEE" },
  { name: "B17-202", building: "Building 17", floor: 2, capacity: 40, branch: "EEE" },
  // ECE - Building 15
  { name: "B15-101", building: "Building 15", floor: 1, capacity: 60, branch: "ECE" },
  { name: "B15-102", building: "Building 15", floor: 1, capacity: 60, branch: "ECE" },
  { name: "B15-201", building: "Building 15", floor: 2, capacity: 80, branch: "ECE" },
  { name: "B15-202", building: "Building 15", floor: 2, capacity: 40, branch: "ECE" },
  // ME - Building 6
  { name: "B6-101", building: "Building 6", floor: 1, capacity: 60,  branch: "ME" },
  { name: "B6-102", building: "Building 6", floor: 1, capacity: 60,  branch: "ME" },
  { name: "B6-201", building: "Building 6", floor: 2, capacity: 80,  branch: "ME" },
  { name: "B6-202", building: "Building 6", floor: 2, capacity: 40,  branch: "ME" },
  // CIVIL - Building 8
  { name: "B8-101", building: "Building 8", floor: 1, capacity: 60,  branch: "CIVIL" },
  { name: "B8-102", building: "Building 8", floor: 1, capacity: 60,  branch: "CIVIL" },
  { name: "B8-201", building: "Building 8", floor: 2, capacity: 80,  branch: "CIVIL" },
  // AERO - Building 11
  { name: "B11-101", building: "Building 11", floor: 1, capacity: 60, branch: "AERO" },
  { name: "B11-201", building: "Building 11", floor: 2, capacity: 60, branch: "AERO" },
  { name: "B11-202", building: "Building 11", floor: 2, capacity: 40, branch: "AERO" },
  // CHEM - Building 9
  { name: "B9-101", building: "Building 9", floor: 1, capacity: 60,  branch: "CHEM" },
  { name: "B9-201", building: "Building 9", floor: 2, capacity: 60,  branch: "CHEM" },
];

// Clear and re-seed
db.prepare("DELETE FROM bookings").run();
db.prepare("DELETE FROM rooms").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='rooms'").run();
db.prepare("DELETE FROM sqlite_sequence WHERE name='bookings'").run();

const insert = db.prepare(
  "INSERT INTO rooms (name, building, floor, capacity, branch) VALUES (?, ?, ?, ?, ?)"
);

const seedAll = db.transaction(() => {
  for (const r of rooms) {
    insert.run(r.name, r.building, r.floor, r.capacity, r.branch);
  }
});

seedAll();

// Print the mapping so you can update dsceData.js
const seeded = db.prepare("SELECT id, name, branch FROM rooms ORDER BY id").all();
console.log("\n✅ Rooms seeded. ID mapping:\n");
console.table(seeded);