const router = require('express').Router();

const {
    signUpValidation,
    loginValidation,
    responseFormat,
} = require('../../utils');

const {
    login,
    signup,
} = require('./controller');

router.post('/login', async (req, res) => {
    const { body } = req;
    const { error } = loginValidation().validate({ ...body });
    if (error) {
        const { details } = error;
        return responseFormat(201, req, null, details[0].message, res);
    }
    const [data, err] = await login(body);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

router.post('/signup', async (req, res) => {
    const { body } = req;
    const { error } = signUpValidation().validate({ ...body });
    if (error) {
        const { details } = error;
        return responseFormat(201, req, null, details[0].message, res);
    }
    const [data, err] = await signup(body);
    if (data) {
        return responseFormat(200, req, data, null, res);
    }
    return responseFormat(500, req, null, err, res);
});

module.exports = router;
