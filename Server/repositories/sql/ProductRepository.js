import Sequelize from 'sequelize';
module.exports = app => {
    const Products = app.libs.db.init.models.Products;
    const op = Sequelize.Op;
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
        search: (model, result) => {
            Products.findAll((model.cid != -1) ? ({
                        where: {
                            categoryId: model.cid,
                            [op.or]: [{
                                    name: {
                                        [op.like]: "%" + model.key + "%"
                                    }
                                },
                                {
                                    description: {
                                        [op.like]: "%" + model.key + "%"
                                    }
                                }
                            ]
                        },
                        limit: model.size
                    }) :
                    ({
                        where: {
                            [op.or]: [{
                                    name: {
                                        [op.like]: "%" + model.key + "%"
                                    }
                                },
                                {
                                    description: {
                                        [op.like]: "%" + model.key + "%"
                                    }
                                }
                            ]
                        },
                        limit: model.size
                    }))
                .then(products => {
                    result(products)
                })
                .catch(error => {

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




// search: (model, result) => {
//     Products.findAll({
//             where: {
//                 categoryId: model.cid,
//                 name: {
//                     [op.like]: "%" + model.key + "%"
//                 },
//                 description: {
//                     [op.like]: "%" + model.key + "%"
//                 }
//             },
//             limit: model.size
//         })
//         .then(products => {
//             result(products)
//         })
//         .catch(error => {

//         });
// }