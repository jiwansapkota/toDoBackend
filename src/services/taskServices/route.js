const router = require('express').Router();
const {
    getAllMyTasks,
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

    const [data, err] = await getAllMyTasks(email);
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
        return responseFormat(201, req, null, details[0].message, res);
    }
    const [data, err] = await create(temp);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.post('/update', async (req, res) => {
    const { body, user: { email } } = req;
    const temp = { ...body, email };
    const [data, err] = await update(temp);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.post('/delete', async (req, res) => {
    const { body: { id }, user: { email } } = req;

    const [data, err] = await del(id, email);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

module.exports = router;
