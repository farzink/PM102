import { validator } from 'express-validator';
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
import * as fs from 'fs-extra'
const uuid = require('uuid/v1');

module.exports = app => {
    //const repo = app.repositories.TaskRepository;
    //const validator = app.models.viewmodels.task.TaskValidationViewModel;
    app.post('/resources/upload', app.xticate.authenticate(), function(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;

        if (!fs.existsSync('profiles')) {
            fs.mkdirsSync('profiles');
        }
        if (fs.existsSync('profiles/temp'))
            fs.mkdirsSync('profiles/temp');

        let path = 'profiles/temp/' + req.user.id;
        if (!fs.existsSync(path)) {
            fs.mkdirsSync(path);
        }
        sampleFile.mv(path + '/' + uuid() + '.jpg', function(err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });
    app.get('/resources/clear', app.xticate.authenticate(), function(req, res) {

        let path = 'profiles/temp/' + req.user.id;
        if (fs.existsSync(path)) {
            fs.remove(path);
        }
    });
}