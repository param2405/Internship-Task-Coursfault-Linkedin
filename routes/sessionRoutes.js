const express = require('express');
const router = express.Router();
const { listSessions, getSessionById } = require('../controllers/sessionController');

router.get('/', listSessions);
router.get('/:id', getSessionById);

module.exports = router;
