module.exports = app => {
    const Categories = app.libs.db.init.models.Categories;
    return {
        findAll: (model, result) => {
            Categories.findAll({})
                .then(categories => result(categories))
                .catch(error => {
                    //less fart more art
                });
        },
        add: (model, result) => {
            Categories.create(model)
                .then(category => {
                    return result(category);
                });
        }
    };
};