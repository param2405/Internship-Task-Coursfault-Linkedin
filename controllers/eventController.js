const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      pageUrl,
      timestamp,
      device,
      browser,
      x,
      y,
    } = req.body;

    const event = new Event({
      sessionId,
      eventType,
      pageUrl,
      timestamp,
      device,
      browser,
      clickData: {
        x,
        y,
      },
    });

    await event.save();
    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { type, pageUrl } = req.query;
    const filter = {};
    if (type) filter.eventType = type;
    if (pageUrl) filter.pageUrl = pageUrl;
    const events = await Event.find(filter).sort({ timestamp: -1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEventStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const eventTypes = await Event.aggregate([
      { $group: { _id: "$eventType", count: { $sum: 1 } } },
    ]);
    const deviceCounts = await Event.aggregate([
      { $group: { _id: "$device", count: { $sum: 1 } } },
    ]);
    const browserCounts = await Event.aggregate([
      { $group: { _id: "$browser", count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      totalEvents,
      eventTypes,
      deviceCounts,
      browserCounts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.json({ success: true, message: "Event removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};