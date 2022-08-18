const router = require('express').Router();

router.use('/login', (req, res) => {
    res.status(200).send({
        msg: 'logged in successfully',
    });
});

module.exports = router;