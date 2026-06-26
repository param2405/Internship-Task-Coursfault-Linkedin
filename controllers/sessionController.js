const Event = require('../models/Event');

// Return list of sessions with basic summary
exports.listSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$sessionId',
          eventCount: { $sum: 1 },
          device: { $first: '$device' },
          browser: { $first: '$browser' },
          latestVisit: { $first: '$timestamp' },
        },
      },
      { $project: { sessionId: '$_id', eventCount: 1, device: 1, browser: 1, latestVisit: 1, _id: 0 } },
      { $sort: { latestVisit: -1 } },
    ]);

    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Return all events for a session sorted by timestamp
exports.getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ sessionId: id }).sort({ timestamp: 1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
