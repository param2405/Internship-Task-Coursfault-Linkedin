const Event = require('../models/Event');

// Aggregated analytics endpoint
exports.getAnalytics = async (req, res) => {
  try {
    const totalSessionsPromise = Event.distinct('sessionId').then(arr => arr.length);
    const totalClicksPromise = Event.countDocuments({ eventType: 'click' });
    const totalPageViewsPromise = Event.countDocuments({ eventType: 'pageview' });
    const totalEventsPromise = Event.countDocuments();

    const topPagesPromise = Event.aggregate([
      { $match: { eventType: 'pageview', pageUrl: { $exists: true } } },
      { $group: { _id: '$pageUrl', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
      { $project: { pageUrl: '$_id', count: 1, _id: 0 } },
    ]);

    const browserAnalyticsPromise = Event.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $project: { browser: '$_id', count: 1, _id: 0 } },
    ]);

    const deviceAnalyticsPromise = Event.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $project: { device: '$_id', count: 1, _id: 0 } },
    ]);

    const [totalSessions, totalClicks, totalPageViews, totalEvents, topPages, browserAnalytics, deviceAnalytics] = await Promise.all([
      totalSessionsPromise,
      totalClicksPromise,
      totalPageViewsPromise,
      totalEventsPromise,
      topPagesPromise,
      browserAnalyticsPromise,
      deviceAnalyticsPromise,
    ]);

    res.json({
      success: true,
      totalSessions,
      totalClicks,
      totalPageViews,
      totalEvents,
      topPages,
      browserAnalytics,
      deviceAnalytics,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Return click events for a given pageUrl query param
exports.getHeatmap = async (req, res) => {
  try {
    const pageUrl = req.query.pageUrl || req.query.page || req.query.url || null;
    const match = { eventType: 'click' };
    if (pageUrl) match.pageUrl = pageUrl;

    const clicks = await Event.find(match).sort({ timestamp: -1 }).lean();
    res.json({ success: true, clicks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
