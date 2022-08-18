/* eslint-disable func-names */
/* eslint-disable consistent-return */
const mangoose = require('mongoose');

const { Schema } = mangoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },

});

userSchema.pre('save', function (next) {
    try {
        const user = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.password, salt, (error, hash) => {
                    if (error) {
                        return next(error);
                    }
                    user.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    } catch (error) {
        return next(error);
    }
});
module.exports = mangoose.model('User', userSchema);
