const router = require('express').Router();
const { authenticateToken } = require('../utils');

router.use('/auth', require('./authServices/route'));
router.use('/task', authenticateToken, require('./taskServices/route'));

module.exports = router;
