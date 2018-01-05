import Sequelize from 'sequelize';

module.exports = app => {
    const Images = app.libs.db.init.models.Images;

    const op = Sequelize.Op;
    return {
        findAll: (model, result) => {
            Images.findAll({})
                .then(image => result(images))
                .catch(error => {

                });
        },
        add: (model, result) => {
            Images.create(model)
                .then(image => {
                    return result(image);
                });
        },
        findAllByProfileId: (model, result) => {
            Images.findAll({
                    where: {
                        productId: model
                    }
                })
                .then(images => result(images))
                .catch(error => {

                });
        },
        delete: (model, result) => {
            Images.destroy({
                    where: {
                        name: model.name
                    }
                })
                .then(image => {
                    return result(true)
                })
        },
        deleteByProductId: (model, result) => {

            Images.destroy({
                    where: {
                        product_id: model
                    }
                })
                .then(image => {
                    return result(true)
                })
        },
        getById: (model, result) => {
            Images.findOne({
                where: { id: model.id }
            }).then(image => {
                return result(image)
            })

        },
        getDefaultProductImage: (model, result) => {
            Images.findOne({
                where: {
                    product_id: model.id,
                    //isDefault: true
                },
                limit: 1
            }).then(image => {
                return result(image)
            })
        },
        getProductImages: (model, result) => {
            Images.findAll({
                where: {
                    product_id: model.id
                }
            }).then(images => {
                return result(images.map(image => {
                    return {
                        name: image.name,
                        isDefault: image.isDefault
                    }
                }))
            })

        }
    };
};