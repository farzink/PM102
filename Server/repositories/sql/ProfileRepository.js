module.exports = app => {
    const Profiles = app.libs.db.init.models.Profiles;
    return {
        findAll: (model, result) => {
            // Products.findAll({})
            //     .then(products => result(products))
            //     .catch(error => {

            //     });
        },
        add: (model, result) => {
            model.role = "user";
            Profiles.create(model)
                .then(profile => {
                    result(profile);
                });
        },
        profileExistsByEmail: (model, result) => {
            Profiles.findOne({
                where: { email: model.email }
            }).then(profile => {

                if (profile === null)
                    return result(false);
                else
                    return result(true);
            })
        },
        findById: (model, result) => {
            Profiles.findOne({
                where: { id: model.id }
            }).then(profile => {
                return result(profile)
            })

        }
    }
};