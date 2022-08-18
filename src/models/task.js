const mangoose = require('mongoose');

const { Schema } = mangoose;

const taskSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    taskName: {
        type: String,
        require: true,
    },
    isDone: {
        type: Boolean,
        require: true,
    },
    subTasks: [{
        name: {
            type: String,
            require: true,
        },
        isDone: {
            type: Number,
            require: true,
        },
    }],

});
module.exports = mangoose.model('Task', taskSchema);
