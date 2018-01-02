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
        deleteById: (model, result) => {
            Images.destroy({
                    where: {
                        id: model.id
                    }
                })
                .then(image => {
                    return result(image.id)
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
                    productId: model.id,
                    isDefault: true
                }
            }).then(image => {
                return result(image)
            })

        }
    };
};