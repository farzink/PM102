module.exports = app => {
    const Products = app.libs.db.init.models.Products;
    return {
        findAll: (model, result) => {
            Products.findAll({})
                .then(products => result(products))
                .catch(error => {

                });
        },
        add: (model, result) => {
            Products.create(model)
                .then(product => {
                    return result(product);
                });
        },
        findAllByProfileId: (model, result) => {
            Products.findAll({
                    where: {
                        Id: model
                    }
                })
                .then(products => result(products))
                .catch(error => {

                });
        },
        add: (model, result) => {
            Products.create(model)
                .then(product => {
                    return result(product);
                });
        },
        deleteById: (model, result) => {
            Products.destroy({
                    where: {
                        id: model.id
                    }
                })
                .then(product => {
                    return result(model.id)
                })
        },
        putById: (model, params, result) => {
            let values = {
                name: model.name,
                description: model.description,
                price: model.price,
                condition: model.condition,
                available: model.available,
                isAktive: model.visible
            }
            let selector = {
                where: { id: params.id }
            }

            Products.update(values, selector)
                .then(product => {
                    return result(product)
                })
        },
        getById: (model, result) => {
            Products.findOne({
                where: { id: model.id }
            }).then(product => {
                return result(product)
            })

        }
    };
};