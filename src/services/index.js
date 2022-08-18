const router = require('express').Router();
const { authenticateToken } = require('../utils');

router.use('/task', authenticateToken, require('./taskServices/route'));
router.use('/auth', require('./authServices/route'));

module.exports = router;
