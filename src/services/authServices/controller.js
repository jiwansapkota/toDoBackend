const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const { secretKey } = require('../../config/config');

module.exports = {
    signup: async (body) => {
        const { email, username, password } = body;
        try {
            const doesExists = await User.findOne({
                email,
            });
            if (doesExists) {
                return [{ success: false, msg: 'user already exists for this email' }, null];
            }
            const newUser = User({ email, username, password });
            const success = await newUser.save();
            const data = success
                ? { success: true, msg: 'user successfully created' }
                : { success: false, msg: 'failed to create user' };
            return [data, null];
        } catch (err) {
            console.log('error', err);
            return [null, err];
        }
    },
    login: async (body) => {
        const { email, password } = body;
        try {
            const user = await User.findOne({
                email,
            });
            if (!user) {
                return [{ success: false, msg: 'Authentication failed, User not found' }, null];
            }
            if (await bcrypt.compare(password, user.password)) {
                const newUser = user;
                delete newUser.password;
                console.log(newUser);
                const token = jwt.sign({ newUser }, secretKey,
                    { expiresIn: 600 });
                return [{
                    success: true,
                    token,
                    msg: 'User successfully logged in',
                }, null];
            }
            return [{
                success: false,
                msg: 'Login Failed, Wrong Password',
            }, null];
        } catch (err) {
            console.log('error', err);
            return [null, err];
        }
    },
};
