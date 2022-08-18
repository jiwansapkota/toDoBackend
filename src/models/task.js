var mangoose = require('mongoose')
var Schema = mangoose.Schema


var taskSchema = new Schema({
    taskName: {
        type: String,
        require: true
    },
    isDone:{
        type:Boolean,
        require: true,
    },
    subTasks: [{
        name: {
            type: String,
            require: true
        },
        isDone: {
            type: Number,
            require: true,
        }
    }],

})
module.exports = mangoose.model('Task', taskSchema)