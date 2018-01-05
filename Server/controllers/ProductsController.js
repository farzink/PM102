import { error } from "util"

module.exports = app => {
    const repo = app.repositories.sql.ProductRepository;
    const validator = app.models.viewmodels.product.ProductValidationViewModel;

    app.route("/products/profile/repo/items")
        .all(app.xticate.authenticate())

    .get((req, res) => {

        let profileId = req.user.id;
        repo.findAllByProfileId(profileId, (products) => {
            res.json({ products: products });
        })
    });

    app.post("/products/inraduis", (req, res) => {
        let model = req.body
        repo.findDistance(model, result => {

            res.json({ distance: result });
        })
    });
    app.get("/products", (req, res) => {
        app.xticate.profileProvider(req, result => {
            let desiredDistance = 1;
            var coordinate = null;
            let model = req.query;
            if (model.term == undefined)
                model.term = "";
            let searchParams = {
                start: (model.start) ? model.start : 0,
                size: (model.size) ? model.size : 10,
                cid: (model.cid) ? model.cid : "",
                key: (model.key) ? model.key : "",
                profileId: null
            }

            if (result != -1) {
                app.repositories.sql.ProfileRepository.findById(result, profile => {

                    if (profile.lat != "" && profile.long != "") {
                        coordinate = app.repositories.sql.ProductRepository.getLatandLngFor(desiredDistance, {
                                lat: profile.lat,
                                lng: profile.long
                            })
                            //1

                        searchParams.profileId = result;



                        repo.searchByRadius(searchParams, coordinate, (products) => {
                            res.json({ products: products });
                        })
                    } else {

                        searchParams.profileId = result;

                        repo.search(searchParams, (products) => {
                            res.json({ products: products });
                        })
                    }
                });
            } else {
                //3
                searchParams.profileId = -1;
                repo.search(searchParams, (products) => {
                    res.json({ products: products });
                })
            }



        });
    });






    app.route("/products/:id")
        .get((req, res) => {

            let model = req.params
            repo.getById(model, (result) => {
                try {
                    res.json({ product: result })
                } catch (err) {
                    res.json(err.message)
                }
            })
        });
    app.route("/products/full/:id")
        .get((req, res) => {
            let model = req.params
            repo.getByIdWithImages(model, (result) => {
                try {
                    res.json({ product: result })
                } catch (err) {
                    res.json(err.message)
                }
            })
        });

    app.route("/products")
        .all(app.xticate.authenticate())
        .post(validator.validate(),
            (req, res) => {
                const errors = validator.response(req, res);
                if (errors.result) {
                    errors.response();
                } else {

                    repo.add({
                        name: req.body.name,
                        price: req.body.price,
                        category_id: req.body.categoryId,
                        description: req.body.description,
                        profile_id: req.user.id,
                        condition: req.body.condition
                    }, (result) => {
                        res.status(201).json({ result: result });
                    });
                }
            })
        .put((req, res) => {
            var model = req.body
            model.profile_id = req.user.id
            console.log(model)
            repo.update(model, result => {
                res.json({ product: result });
            })
        })




    app.route("/products/:id")
        .all(app.xticate.authenticate())
        .delete((req, res) => {
            let model = req.params

            repo.delete(model, result => {
                res.json({ success: true });
            })
        })

};