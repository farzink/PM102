import Sequelize from 'sequelize';
import * as fs from 'fs-extra'
const uuid = require('uuid/v1');

module.exports = app => {
    const Products = app.libs.db.init.models.Products;
    const Profiles = app.libs.db.init.models.Profiles;
    const imageRepository = app.repositories.sql.ImageRepository;
    const op = Sequelize.Op;
    return {
        findAll: (model, result) => {
            Products.findAll({})
                .then(products => {

                    result(products.map(product => {

                        return {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            condition: product.condiction,
                            description: product.description,
                            categoryId: product.categoryId,
                            available: product.available,
                            nov: product.nov,
                            image: "resources/products/images/default/" + product.id,
                            updated: product.updated_at
                        }
                    }))
                })
                .catch(error => {

                });
        },
        add: (model, result) => {
            Products.create(model)
                .then(product => {

                    if (!fs.existsSync('products')) {
                        fs.mkdirsSync('products');
                    }
                    if (!fs.existsSync('products/images'))
                        fs.mkdirsSync('products/images');

                    let path = 'products/images/' + product.id;
                    if (!fs.existsSync(path)) {
                        fs.mkdirsSync(path);
                    }
                    let temp = 'profiles/temp/' + model.profileId;


                    if (fs.existsSync(temp)) {

                        let files = fs.readdirSync(temp);


                        files.forEach(function(file, index) {
                            let filename = uuid() + ".jpg";
                            fs.copySync(temp + "/" + file, path + "/" + filename)
                            imageRepository.add({
                                name: filename,
                                productId: product.id,
                                isDefault: (index === 0) ? true : false
                            }, result => {

                            });
                        });
                    }







                    // sampleFile.mv(path + '/' + sampleFile.name, function(err) {
                    //     if (err)
                    //         return res.status(500).send(err);

                    //     res.send('File uploaded!');
                    // });
                    //}

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
                                // ,
                                // [op.and]: Sequelize.where(Sequelize.fn('FUNCTION',))                            
                        },
                        include: [{
                            model: Profiles,
                            where: {
                                lat: {
                                    [op.or]: [{
                                        [op.gt]: 10,
                                        [op.lt]: 60
                                    }]
                                }
                            }
                        }],
                        limit: model.size
                    }))
                .then(products => {
                    result(products.map(product => {
                        return {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            condition: product.condiction,
                            description: product.description,
                            categoryId: product.categoryId,
                            available: product.available,
                            nov: product.nov,
                            image: "resources/products/images/default/" + product.id,
                            updated: product.updated_at
                        }
                    }))
                })
                .catch(error => {

                });
        },
        findDistance: (points) => {

            var R = 6371e3; // metres
            var φ1 = app.repositories.sql.ProductRepository.toRadian(points.first.lat);
            var φ2 = app.repositories.sql.ProductRepository.toRadian(points.second.lat);
            var Δφ = app.repositories.sql.ProductRepository.toRadian(points.second.lat - points.first.lat);
            var Δλ = app.repositories.sql.ProductRepository.toRadian(points.second.lng - points.first.lng);

            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            var d = R * c;
            console.log(d / 1000);
            return d;
        },
        toRadian: function(angle) {
            return angle * (Math.PI / 180);
        },
        findProductsByRadius: (model, result) => {

            result(this.findDistance(model))
        },
        findAllByProfileId: (model, result) => {

            Products.findAll({
                    where: {
                        profile_id: model
                    }
                })
                .then(products => result(products.map(product => {
                    console.log("--------------------------------")
                    product.isInRadius(null);

                    return {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        condition: product.condiction,
                        description: product.description,
                        categoryId: product.category_id,
                        available: product.available,
                        nov: product.nov,
                        image: "resources/products/images/default/" + product.id,
                        updated: product.updated_at
                    }
                })))
                .catch(error => {

                });
        },
        // add: (model, result) => {
        //     Products.create(model)
        //         .then(product => {
        //             return result(product);
        //         });
        // },
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
                imageRepository.getDefaultProductImage({
                    id: product.id
                }, image => {

                    var image = (image == null) ? "0/default" : product.id + "/" + image.name;

                    return result({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        condition: product.condiction,
                        description: product.description,
                        categoryId: product.categoryId,
                        available: product.available,
                        nov: product.nov,
                        image: image,
                        updated: product.updated_at
                    })
                })
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