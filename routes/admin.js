const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middlewares/auth');

router.get('/', ensureAdmin, adminController.dashboard);
router.post('/applications/:applicationId/grade', ensureAdmin, adminController.gradeApplication);

module.exports = router;