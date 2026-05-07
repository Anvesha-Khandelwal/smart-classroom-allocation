export const BRANCH_DATA = {
  CSE: {
    label: "Computer Science & Engineering",
    building: "Building 19 (NB Block)", short: "NB", color: "indigo",
    rooms: [
      { id: 1,  name: "NB-101", capacity: 60, floor: 1 },
      { id: 2,  name: "NB-102", capacity: 60, floor: 1 },
      { id: 3,  name: "NB-103", capacity: 40, floor: 1 },
      { id: 4,  name: "NB-201", capacity: 60, floor: 2 },
      { id: 5,  name: "NB-202", capacity: 60, floor: 2 },
      { id: 6,  name: "NB-203", capacity: 40, floor: 2 },
      { id: 7,  name: "NB-301", capacity: 80, floor: 3 },
      { id: 8,  name: "NB-302", capacity: 60, floor: 3 },
    ]
  },
  ISE: {
    label: "Information Science & Engineering",
    building: "Building 19 (NB Block)", short: "NB", color: "blue",
    rooms: [
      { id: 9,  name: "NB-104", capacity: 60, floor: 1 },
      { id: 10, name: "NB-204", capacity: 60, floor: 2 },
      { id: 11, name: "NB-304", capacity: 40, floor: 3 },
    ]
  },
  AIML: {
    label: "AI & Machine Learning",
    building: "Building 19 (NB Block)", short: "NB", color: "violet",
    rooms: [
      { id: 12, name: "NB-105", capacity: 60, floor: 1 },
      { id: 13, name: "NB-205", capacity: 60, floor: 2 },
      { id: 14, name: "NB-305", capacity: 40, floor: 3 },
    ]
  },
  MATHS_DS: {
    label: "Mathematics & Data Science",
    building: "Building 4", short: "B4", color: "emerald",
    rooms: [
      { id: 15, name: "B4-101", capacity: 60, floor: 1 },
      { id: 16, name: "B4-102", capacity: 60, floor: 1 },
      { id: 17, name: "B4-201", capacity: 80, floor: 2 },
      { id: 18, name: "B4-202", capacity: 40, floor: 2 },
      { id: 19, name: "B4-301", capacity: 60, floor: 3 },
    ]
  },
  EEE: {
    label: "Electrical & Electronics Engineering",
    building: "Building 17", short: "B17", color: "yellow",
    rooms: [
      { id: 20, name: "B17-101", capacity: 60, floor: 1 },
      { id: 21, name: "B17-102", capacity: 60, floor: 1 },
      { id: 22, name: "B17-201", capacity: 80, floor: 2 },
      { id: 23, name: "B17-202", capacity: 40, floor: 2 },
    ]
  },
  ECE: {
    label: "Electronics & Communication Engineering",
    building: "Building 15", short: "B15", color: "orange",
    rooms: [
      { id: 24, name: "B15-101", capacity: 60, floor: 1 },
      { id: 25, name: "B15-102", capacity: 60, floor: 1 },
      { id: 26, name: "B15-201", capacity: 80, floor: 2 },
      { id: 27, name: "B15-202", capacity: 40, floor: 2 },
    ]
  },
  ME: {
    label: "Mechanical Engineering",
    building: "Building 6", short: "B6", color: "red",
    rooms: [
      { id: 28, name: "B6-101", capacity: 60, floor: 1 },
      { id: 29, name: "B6-102", capacity: 60, floor: 1 },
      { id: 30, name: "B6-201", capacity: 80, floor: 2 },
      { id: 31, name: "B6-202", capacity: 40, floor: 2 },
    ]
  },
  CIVIL: {
    label: "Civil Engineering",
    building: "Building 8", short: "B8", color: "stone",
    rooms: [
      { id: 32, name: "B8-101", capacity: 60, floor: 1 },
      { id: 33, name: "B8-102", capacity: 60, floor: 1 },
      { id: 34, name: "B8-201", capacity: 80, floor: 2 },
    ]
  },
  AERO: {
    label: "Aeronautical Engineering",
    building: "Building 11", short: "B11", color: "sky",
    rooms: [
      { id: 35, name: "B11-101", capacity: 60, floor: 1 },
      { id: 36, name: "B11-201", capacity: 60, floor: 2 },
      { id: 37, name: "B11-202", capacity: 40, floor: 2 },
    ]
  },
  CHEM: {
    label: "Chemical Engineering",
    building: "Building 9", short: "B9", color: "teal",
    rooms: [
      { id: 38, name: "B9-101", capacity: 60, floor: 1 },
      { id: 39, name: "B9-201", capacity: 60, floor: 2 },
    ]
  },
};

// rest of the file stays the same...
export const COLOR_MAP = {
  indigo: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", bg: "bg-indigo-500", text: "text-white" },
  blue:   { badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-500",   bg: "bg-blue-500",   text: "text-white" },
  violet: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", bg: "bg-violet-500", text: "text-white" },
  emerald:{ badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", bg: "bg-emerald-500", text: "text-white" },
  yellow: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500", bg: "bg-yellow-500", text: "text-white" },
  orange: { badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500", bg: "bg-orange-500", text: "text-white" },
  red:    { badge: "bg-red-100 text-red-700",    dot: "bg-red-500",    bg: "bg-red-500",    text: "text-white" },
  stone:  { badge: "bg-stone-100 text-stone-700", dot: "bg-stone-500", bg: "bg-stone-500", text: "text-white" },
  sky:    { badge: "bg-sky-100 text-sky-700",    dot: "bg-sky-500",    bg: "bg-sky-500",    text: "text-white" },
  teal:   { badge: "bg-teal-100 text-teal-700",   dot: "bg-teal-500",   bg: "bg-teal-500",   text: "text-white" },
};
export const TIME_SLOTS = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
export const today = new Date().toISOString().split("T")[0];