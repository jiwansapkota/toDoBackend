/* eslint-disable no-underscore-dangle */
const Task = require('../../models/task');

const getAllTasksForUser = async (email) => {
    try {
        const myTasks = await Task.find({
            email,
        });
        return [myTasks, null];
    } catch (err) {
        console.log('error', err);
        return [null, err];
    }
};
module.exports = {
    getAllMyTasks: async (email) => {
        try {
            const TaskList = await getAllTasksForUser(email);
            const data = { success: true, message: 'task successfully fetched', data: TaskList[0] };
            return [data, null];
        } catch (err) {
            console.log('error', err);
            return [null, err];
        }
    },
    create: async (task) => {
        try {
            const newTask = Task({ ...task });
            const success = await newTask.save();
            const newTaskList = await getAllTasksForUser(task.email);
            const data = success
                ? { success: true, message: 'task successfully created', data: newTaskList[0] }
                : { success: false, message: 'failed to create the task', data: newTaskList[0] };
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
            const newTaskList = await getAllTasksForUser(task.email);
            const data = success
                ? { success: true, message: 'task successfully updated', data: newTaskList[0] }
                : { success: false, message: 'failed to update the task', data: newTaskList[0] };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
    del: async (id, email) => {
        try {
            const success = await Task.deleteOne({ id, email });
            const newTaskList = await getAllTasksForUser(email);
            const data = success
                ? { success: true, message: 'task successfully deleted', data: newTaskList[0] }
                : { success: false, message: 'failed to delete the task', data: newTaskList[0] };
            return [data, null];
        } catch (err) {
            console.log(err);
            return [null, err];
        }
    },
};
