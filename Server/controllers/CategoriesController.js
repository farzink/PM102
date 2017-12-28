import { error } from "util";

module.exports = app => {
    const repo = app.repositories.sql.CategoryRepository;
    //const validator = app.models.viewmodels.category.CategoryValidationViewModel;


    app.get('/categories', (req, res) => {
        repo.findAll(categories => {
            res.json({ categories: categories });
        })
    });

    // app.get("/categories/:id", app.xticate.authenticate(), (req, res) => {
    //     //console.log(req.user);
    //     //let model = req.params;
    //     console.log(model);
    //     repo.findAll(model, (categories) => {
    //         res.json({ categories: categories });
    //     });
    // });


    // app.route("/categories")
    //     .all(app.xticate.authenticate())
    //     .get((req, res) => {
    //         console.log(req.user);
    //         let model = req.params;
    //         console.log(model);
    //         repo.findAll(model, (categories) => {
    //             res.json({ categories: categories });
    //         })
    //     })
    //     .post(validator.validate(),
    //         (req, res) => {
    //             const errors = validator.response(req, res);
    //             if (errors.result) {
    //                 errors.response();
    //             } else {
    //                 var model = req.body;
    //                 repo.add(model, (result) => {
    //                     res.status(201).json({ category: result });
    //                 });
    //             }
    //         })
    //     .delete((req, res) => {
    //         let model = req.params
    //         repo.deleteById(model, (result) => {
    //             try {
    //                 res.json({ category: result });
    //             } catch (err) {
    //                 res.json(err.message);
    //             }
    //         });
    //     })
    //     .put((req, res) => {
    //         let model = req.body
    //         let params = req.params
    //         repo.putById(model, params, (result) => {
    //             try {
    //                 res.json({ category: result });
    //             } catch (err) {
    //                 res.json(err.message);
    //             }
    //         });
    //     });







    // app.route("/categories")
    //     .all(app.xticate.authenticate())
    //     .post(validator.validate(),
    //         (req, res) => {
    //             const errors = validator.response(req, res);
    //             if (errors.result) {
    //                 errors.response();
    //             } else {
    //                 var model = req.body;
    //                 repo.add(model, (result) => {
    //                     res.status(201).json({ category: result });
    //                 });
    //             }
    //         })
    //     .delete((req, res) => {
    //         let model = req.params
    //         repo.deleteById(model, (result) => {
    //             try {
    //                 res.json({ category: result });
    //             } catch (err) {
    //                 res.json(err.message);
    //             }
    //         });
    //     })
    //     .put((req, res) => {
    //         let model = req.body
    //         let params = req.params
    //         repo.putById(model, params, (result) => {
    //             try {
    //                 res.json({ category: result });
    //             } catch (err) {
    //                 res.json(err.message);
    //             }
    //         });
    //     });
}