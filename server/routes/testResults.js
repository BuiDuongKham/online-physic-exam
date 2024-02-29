const express = require('express');

const requireAuth = require('../middlewares/requireAuth');
const { getResultByContestId, submit, getTestResult } = require('../controllers/result');
const router = express.Router();

router.post('/submit', requireAuth.requireAuth, submit);
router.get('/:contestId', requireAuth.isAdmin, getResultByContestId);
router.get('/:contestId/:userId', getTestResult);
module.exports = router;
