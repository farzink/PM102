import mongoose from 'mongoose';

module.exports = app => {
    const Category = app.models.Category;
    var CategoryModel = mongoose.model("Category");
    var helper = app.models.db.helper;

    return {
        //Get one Category
        findById: (model, result) => {
            let query = CategoryModel.find(helper.getId(model), 
            function(err, category){
                query.select(Category);
                query.exec(function (err, category){
                    try
                    {
                        return result(helper.success(category));
                    }
                    catch(err)
                    {
                        return result(helper.failed(err.message));
                    }
                })
            });
        },

        //Find all Categories
        findAll: (model, result) => {   
            let query = CategoryModel.find({}, 
            function(err, category){
                query.select(Category);
                query.exec(function (err, category){
                    try
                    {
                        return result(helper.success(category));
                    }
                    catch(err)
                    {
                        return result(helper.failed(err.message));
                    }
                })
            });
        },

        //Delete Category
        deleteById: (model, result) => {
            CategoryModel.findByIdAndRemove({ _id: model.id },
                function (err, category) {
                    try {
                        if (!err && category !== null) {
                            return result(helper.success(category));
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

        //Edit Category
        putById: (model, params, result) => {
            CategoryModel.findByIdAndUpdate(helper.getId(params), model,
                function (model) {
                    try {
                        return result(helper.success());
                    }
                    catch (err) {
                        return result(helper.failed(err.message));
                    }
                });
        },
        
        //Add Category
        add: (model, result) => {
            let category = new CategoryModel();
            category.name = model.name;
            category.description = model.description;
            category.createdOn = Date.now();
            try {
                category.save();
                return result(helper.success(category));
            }
            catch(err) {
                return result(helper.failed(err.message));
            }
            
        }
    };
};