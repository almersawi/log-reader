const express = require('express');
const router = express.Router();
const nanController = require('../controllers/nanController');

router.get('*', nanController.getIndex);

module.exports = router;