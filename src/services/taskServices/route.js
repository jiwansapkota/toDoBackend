const router = require('express').Router();

router.use('/', (req, res) => {
    res.status(200).send({
        msg: 'server setup success',
    });
});

module.exports = router;