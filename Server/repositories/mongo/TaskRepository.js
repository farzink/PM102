import mongoose from 'mongoose';

module.exports = app => {
    const Task = app.models.task;
    var TaskModel = mongoose.model("Task");
    return {
        findAll: (model, result) => {
            return result([
                { title: "t1" },
                { title: "t2" },
                { title: "t3" }
            ]);
        },
        add: (model, result) => {
            var task = new TaskModel();
            task.title = model.title;
            task.description = model.description;
            task.save();
            return result(task);
        }
    };
};