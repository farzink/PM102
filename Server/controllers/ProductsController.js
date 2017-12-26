import { error } from "util"

module.exports = app => {
    const repo = app.repositories.sql.ProductRepository;
    const validator = app.models.viewmodels.product.ProductValidationViewModel;

    app.route("/products/:id")
        .all(app.xticate.authenticate())
        .delete((req, res) => {
            let model = req.params
            repo.deleteById(model, (result) => {
                try {
                    res.status(200).json({ result: result });
                } catch (err) {
                    res.json(err.message);
                }
            })
        })
        .put((req, res) => {
            let model = req.body
            let params = req.params
            repo.putById(model, params, (result) => {
                try {
                    res.json({ product: result });
                } catch (err) {
                    res.json(err.message);
                }
            })
        })
        .get((req, res) => {
            let model = req.params
            repo.getById(model, (result) => {
                try {
                    res.json({ product: result })
                } catch (err) {
                    res.json(err.message)
                }
            })
        })

    app.route("/products")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            let model = req.params;
            console.log(model);
            repo.findAll(model, (products) => {
                res.json({ products: products });
            })
        })
        .post(validator.validate(),
            (req, res) => {
                const errors = validator.response(req, res);
                if (errors.result) {
                    errors.response();
                } else {
                    var model = req.body;
                    repo.add(model, (result) => {
                        res.status(201).json({ result: result });
                    });
                }
            });

}