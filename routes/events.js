const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const { getEventByAddress, postEvent, getAllEvent, runCronNode } = require('../controllers/events')

router.route('/').post(postEvent);
router.route('/node/:address').post(runCronNode);
router.route('/:address').get(getEventByAddress)
router.route('/all').get(getAllEvent)

module.exports = router;