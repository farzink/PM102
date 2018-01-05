import Sequelize from 'sequelize';
import * as fs from 'fs-extra'
const uuid = require('uuid/v1');

module.exports = app => {



    const Products = app.libs.db.init.models.Products;
    const Profiles = app.libs.db.init.models.Profiles;
    const Categories = app.libs.db.init.models.Categories;
    const imageRepository = app.repositories.sql.ImageRepository;

    const op = Sequelize.Op;


    return {
        getLatandLngFor: (distance, point) => {
            let lngBase = 0.015500
            let latBase = 0.090000

            return {
                lngup: lngBase * distance + parseFloat(point.lng),
                latright: latBase * distance + parseFloat(point.lat),
                lngdown: parseFloat(point.lng) - lngBase * distance,
                latleft: parseFloat(point.lat) - latBase * distance
            }
        },
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
                    let temp = 'profiles/temp/' + model.profile_id;


                    if (fs.existsSync(temp)) {

                        let files = fs.readdirSync(temp);


                        files.forEach(function(file, index) {
                            let filename = uuid() + ".jpg";
                            fs.copySync(temp + "/" + file, path + "/" + filename)

                            imageRepository.add({
                                name: filename,
                                product_id: product.id,
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
        searchByRadius: (model, coordinate, result) => {




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
                                        [op.gt]: coordinate.latleft,
                                        [op.lt]: coordinate.latright
                                    }]
                                },
                                long: {
                                    [op.or]: [{
                                        [op.gt]: coordinate.lngdown,
                                        [op.lt]: coordinate.lngup
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
                            updated: product.updated_at,
                            lat: product.dataValues.Profile.dataValues.lat,
                            lng: product.dataValues.Profile.dataValues.long
                        }

                    }))
                })
                .catch(error => {

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
                        // include: [{
                        //     model: Profiles,
                        //     where: {
                        //         lat: {
                        //             [op.or]: [{
                        //                 [op.gt]: 10,
                        //                 [op.lt]: 60
                        //             }]
                        //         }
                        //     }
                        // }],
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
            var t1 = app.repositories.sql.ProductRepository.toRadian(points.first.lat);
            var t2 = app.repositories.sql.ProductRepository.toRadian(points.second.lat);
            var dt = app.repositories.sql.ProductRepository.toRadian(points.second.lat - points.first.lat);
            var dl = app.repositories.sql.ProductRepository.toRadian(points.second.lng - points.first.lng);

            var a = Math.sin(dt / 2) * Math.sin(dt / 2) +
                Math.cos(t1) * Math.cos(t2) *
                Math.sin(dl / 2) * Math.sin(dl / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            var d = R * c;

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
        delete: (model, result) => {

            Products.destroy({
                    where: {
                        id: model.id
                    }
                })
                .then(product => {
                    // imageRepository.deleteByProductId(model.id, res => {
                    //     return result(true)
                    // })
                    return result(true)
                })
        },
        update: (model, result) => {
            let product = {
                name: model.name,
                description: model.description,
                price: model.price,
                condition: model.condition,
                category_id: model.category_id
                    //available: model.available,

            }
            Products.update(product, {
                    where: {
                        id: model.product_id
                    }
                })
                .then(product => {
                    if (!fs.existsSync('products')) {
                        fs.mkdirsSync('products');
                    }
                    if (!fs.existsSync('products/images'))
                        fs.mkdirsSync('products/images');

                    let path = 'products/images/' + model.product_id;
                    if (!fs.existsSync(path)) {
                        fs.mkdirsSync(path);
                    }
                    let temp = 'profiles/temp/' + model.profile_id;

                    console.log(temp)

                    if (fs.existsSync(temp)) {

                        let files = fs.readdirSync(temp);


                        files.forEach(function(file, index) {
                            let filename = uuid() + ".jpg";
                            fs.copySync(temp + "/" + file, path + "/" + filename)

                            imageRepository.add({
                                name: filename,
                                product_id: model.product_id,
                                isDefault: (index === 0) ? true : false
                            }, result => {

                            });
                        });
                        fs.removeSync(temp)
                    }


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

        },
        getByIdWithImages: (model, result) => {

            Products.findOne({
                where: { id: model.id },
                include: [{
                    model: Categories
                }]
            }).then(product => {
                imageRepository.getProductImages({
                    id: product.id
                }, images => {

                    //var image = (image == null) ? "0/default" : product.id + "/" + image.name;

                    return result({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        condition: product.condition,
                        description: product.description,
                        categoryId: (product.dataValues.Category != undefined) ? product.dataValues.Category.dataValues.id : -1,
                        available: product.available,
                        nov: product.nov,
                        images: images,
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