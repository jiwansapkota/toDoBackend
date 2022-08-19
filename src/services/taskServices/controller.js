/* eslint-disable no-underscore-dangle */
const Task = require('../../models/task');

module.exports = {
    getAllTasksForUser: async (email) => {
        try {
            const myTasks = await Task.find({
                email,
            });
            return [myTasks, null];
        } catch (err) {
            console.log('error', err);
            return [null, err];
        }
    },
    create: async (task) => {
        try {
            const newTask = Task({ ...task });
            const success = await newTask.save();
            const data = success
                ? { success: true, message: 'task successfully created' }
                : { success: false, message: 'failed to create the task' };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
    update: async (task) => {
        try {
            const doc = await Task.findOne({ _id: task._id });
            doc.overwrite({ ...task });
            const success = await doc.save();
            const data = success
                ? { success: true, message: 'task successfully updated' }
                : { success: false, message: 'failed to update the task' };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
    del: async (id, email) => {
        try {
            const success = await Task.deleteOne({ _id: id, email });
            const data = success
                ? { success: true, message: 'task successfully deleted' }
                : { success: false, message: 'failed to delete the task' };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
};
