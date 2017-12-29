import { validator } from 'express-validator';
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = app => {
    const repo = app.repositories.sql.ProfileRepository;
    const validator = app.models.viewmodels.profile.ProfileValidationViewModel;


    app.route("/profiles")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            var profileId = req.user.id;
            repo.findById(profileId, (profile) => {
                res.json({ profile: profile });
            });
        })
        .put(validator.validate(),
            (req, res) => {
                const errors = validator.response(req, res);
                if (errors.result) {
                    //res.status(422).json({ errors: errors.errors });
                    errors.response;
                } else {
                    var model = req.body;
                    repo.update(model, req.user.id, result => {
                        res.json({ profile: result });
                    });
                }
            });
}