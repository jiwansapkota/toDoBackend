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
                return [{ success: false, message: 'user already exists for this email' }, null];
            }
            const newUser = User({ email, username, password });
            const success = await newUser.save();
            const data = success
                ? { success: true, message: 'user successfully created' }
                : { success: false, message: 'failed to create user' };
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
                return [{ success: false, message: 'Authentication failed, User not found' }, null];
            }
            if (await bcrypt.compare(password, user.password)) {
                const tempUser = { email: user.email, username: user.username };
                const token = jwt.sign({ ...tempUser }, secretKey,
                    { expiresIn: 1200 });
                return [{
                    success: true,
                    token,
                    message: 'User successfully logged in',
                }, null];
            }
            return [{
                success: false,
                message: 'Login Failed, Wrong Password',
            }, null];
        } catch (err) {
            console.log('error', err);
            return [null, err];
        }
    },
};
