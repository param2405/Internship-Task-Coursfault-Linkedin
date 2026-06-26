const express = require('express')
const router = express.Router()
const { getHeatmap } = require('../controllers/analyticsController')

router.get('/', getHeatmap)

module.exports = router
