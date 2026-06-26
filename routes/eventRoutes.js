const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventStats,
  deleteEvent,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/stats", getEventStats);
router.delete("/:id", deleteEvent);

module.exports = router;