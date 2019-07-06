const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getIndex);

router.get('/:filename/:header', userController.getLog);

router.get('/:id/multi/plot', userController.getMulti)

module.exports = router;