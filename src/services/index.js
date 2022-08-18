const router = require('express').Router();

router.use('/task', require('./taskServices/route'));
router.use('/auth', require('./authServices/route'));

module.exports = router;