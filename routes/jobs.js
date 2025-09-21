const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// GET /jobs - List all open jobs
router.get('/', jobsController.listOpenJobs);

// GET /jobs/:jobId/apply - Show application form for a job
router.get('/:jobId/apply', jobsController.getApplyForm);

module.exports = router;