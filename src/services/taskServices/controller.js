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
                ? { success: true, msg: 'task successfully created' }
                : { success: false, msg: 'failed to create the task' };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
    update: async () => {

    },
    delete: async () => {

    },
};
