const router = require('express').Router();
const {
    getAllTasksForUser,

} = require('./controller');
const {
    responseFormat,
} = require('../../utils');

router.get('/getTasks', async (req, res) => {
    const [data, err] = await getAllTasksForUser(req.user.email);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});
router.post('/create', async (req, res) => {
});
router.post('/update', async (req, res) => {
});
router.delete('/delete', async (req, res) => {
});

module.exports = router;
