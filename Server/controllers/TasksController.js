import { validator } from 'express-validator';
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = app => {
    const repo = app.repositories.TaskRepository;
    const validator = app.models.viewmodels.task.TaskValidationViewModel;

    app.get("/taskq", app.xticate.authenticate(), (req, res) => {
        //if(req.user.role=="customer")
        const tasks = app.libs.db.init.models.Tasks;
        tasks.findAll({}).then(tasks => {
            res.json({ profile: req.user });
        });
    });


    // app.route("/tasks")
    //     .all(app.libs.authentication.authenticate())
    //     .get((req, res) => {
    //         repo.findAll({}, (tasks) => {
    //             res.json({ tasks: tasks });
    //         });
    //     })
    //     .post((req, res) => {
    //         var model = req.body;
    //         repo.add({}, (result) => {
    //             res.json({ task: model });
    //         });
    //     });
    app.route("/tasks")
        .all()
        .get((req, res) => {
            repo.findAll({}, (tasks) => {
                res.json({ tasks: tasks });
            });
        })
        .post(validator.validate(),
            (req, res) => {
                const errors = validator.response(req, res);
                if (errors.result) {
                    //res.status(422).json({ errors: errors.errors });
                    errors.response;
                } else {
                    var model = req.body;
                    repo.add(model, (result) => {
                        res.json({ task: model });
                    });
                }
            });
}