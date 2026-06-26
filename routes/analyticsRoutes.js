const express = require('express');
const router = express.Router();
const { getAnalytics, getHeatmap } = require('../controllers/analyticsController');

router.get('/', getAnalytics);
router.get('/heatmap', getHeatmap);

module.exports = router;
