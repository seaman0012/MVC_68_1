const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const { ensureStudent } = require('../middlewares/auth');

router.post('/:jobId', ensureStudent, applicationsController.applyToJob);

module.exports = router;