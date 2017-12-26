import mongoose from 'mongoose';

module.exports = app => {
    const Product = app.models.Product;
    var ProductModel = mongoose.model("Product", Product);

    const Category = app.models.Product;
    var CategoryModel = mongoose.model("Category", Category);
    var categoryRepository = app.repositories.CategoryRepository;
    var helper = app.models.db.helper;

    return {
        //Show Product
        findById: (model, result) => {
            let query = ProductModel.find(helper.getId(model),
                function (err, product) {
                    query.select(Product);
                    query.exec(function (err, product) {
                        try {
                            return result(helper.success(product));
                        }
                        catch (err) {
                            return result(helper.failed(err.message));
                        }
                    })
                });
        },

        //Delete Product
        deleteById: (model, result) => {
            ProductModel.findByIdAndRemove({ _id: model.id },
                function (err, product) {
                    try {
                        if (!err && product !== null) {
                            return result(helper.success(product));
                        } else {
                            return result(helper.failed(err.message));
                        };
                    }
                    catch (err) {
                        return result(helper.failed(err.message));
                    }

                }
            )
        },

        //Edit Product
        putById: (model, params, result) => {
            ProductModel.findByIdAndUpdate(helper.getId(params), model,
                function (model) {
                    try {
                        return result(helper.success());
                    }
                    catch (err) {
                        return result(helper.failed(err.message));
                    }
                });
        },

        //Add Product        
        add: (model, result) => {
            let product = new ProductModel();
            let categoryId = {
                id: model.category
            }
            categoryRepository.findById(categoryId, (result) => {
                try {
                    categoryId = result.data[0]._id;
                }
                catch (err) {
                    return result(err.message);
                }
            });
            
            product.name = model.name;
            product.price = model.price;
            product.location.lat = model.lat
            product.location.long = model.long
            product.location.street = model.street
            product.location.streetNo = model.streetNo
            product.location.houseNo = model.houseNo
            product.location.plz = model.plz
            product.location.city = model.city
            product.location.country = model.country
            product.summary = model.summary
            product.description = model.description
            product.condition = model.condition
            product.category = categoryId.id
            product.available = model.available
            product.createdOn = Date.now();
            product.save();
            try {
                return result(helper.success(product));
            }
            catch (err) {
                return result(helper.failed(err.message));
            }

        }
    };


};
