const router = require('express').Router();
const {
    getAllTasksForUser,
    create,
    update,
    del,
} = require('./controller');
const {
    responseFormat,
    taskValidation,
} = require('../../utils');

router.get('/getTasks', async (req, res) => {
    const { user: { email } } = req;

    const [data, err] = await getAllTasksForUser(email);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.post('/create', async (req, res) => {
    const { body, user: { email } } = req;

    const temp = { ...body, email };
    const { error } = taskValidation().validate({ ...temp });
    if (error) {
        const { details } = error;
        return responseFormat(401, req, null, details[0].message, res);
    }
    const [data, err] = await create(temp);
    if (data) {
        const [d, e] = await getAllTasksForUser(email);
        if (e) {
            return responseFormat(200, req, null, e, res);
        }
        return responseFormat(200, req, { ...data, data: d }, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.post('/update', async (req, res) => {
    const { body, user: { email } } = req;
    const temp = { ...body, email };
    const [data, err] = await update(temp);
    if (data) {
        const [d, e] = await getAllTasksForUser(email);
        if (e) {
            return responseFormat(200, req, null, e, res);
        }
        return responseFormat(200, req, { ...data, data: d }, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.delete('/delete', async (req, res) => {
    const { body: { id }, user: { email } } = req;

    const [data, err] = await del(id, email);
    if (data) {
        const [d, e] = await getAllTasksForUser(email);
        if (e) {
            return responseFormat(200, req, null, e, res);
        }
        return responseFormat(200, req, { ...data, data: d }, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

module.exports = router;
