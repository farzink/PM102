const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


module.exports = app => {
    return {
        validate: () => {
            return [
                check('name').exists().withMessage("Name of product can not be empty"),
                check('description').exists().withMessage("description can not be empty"),
                check('condition').exists().withMessage("Condition of product cannot be empty"),
                check('categoryId').exists().withMessage("Category of product cannot be empty"),
            ]
        },
        response: (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return { result: true, errors: errors.mapped(), respone: res.status(422).json({ errors: errors.mapped() }) };
            } else {
                return { result: false, errors: null };
            }
        }
    };
}