import mongoose from 'mongoose';
import { escape } from 'querystring';
import { exec } from 'child_process';


module.exports = app => {
    const categoryRepository = app.repositories.CategoryRepository;
    //import Products Model
    const Product = app.models.Product;
    var ProductModel = mongoose.model("Product", Product);

    //import Categories Model
    const Category = app.models.Product;
    var CategoryModel = mongoose.model("Category", Category);

    //use Helper class
    var helper = app.models.db.helper;

    //Check Size and set default as 10
    var size = (model) => {
        if(model.size !== undefined && model.size !== '' && model.size !== NaN){
            let size = parseInt(model.size)
            return size 
        }else{
            return 10
        }
    }

    var page = (model) => {
        if(model.page !== undefined && model.page !== '' && model.page !== NaN){
            let page = Math.max(0, model.page)
            return parseInt(page) 
        }else{
            return 0
        }
    }

    //is search with category filter or not
    var category = (model, query) => {

        if(model.category !== undefined){
            return query.where("category").equals(model.category)   
        }else{
            return null
        }
    }

    return {
        
        findByQuery: (model, result) => {
            function escapeRegex(text) {
                let term = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                return term;
            };
            const term = new RegExp(escapeRegex(model.term));
            var query = ProductModel.find({'name' : term},
                function (err, product) {
                    //Call Category filter is exist
                    category(model, query)
                    query.select(Product)
                    query.limit(size(model))
                    query.skip(size(model) * page(model))
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
        
    }
}