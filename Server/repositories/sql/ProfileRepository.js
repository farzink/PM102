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
                where: { id: model }
            }).then(profile => {
                return result({
                    firstname: profile.firstname != null ? profile.firstname : "",
                    lastname: profile.lastname != null ? profile.lastname : "",
                    email: profile.email != null ? profile.email : "",
                    street: profile.street != null ? profile.street : "",
                    houseno: profile.houseno != null ? profile.houseno : "",
                    state: profile.state != null ? profile.state : "",
                    city: profile.city != null ? profile.city : "",
                    postalcode: profile.postalcode != null ? profile.postalcode : "",
                    phone: profile.phone != null ? profile.phone : ""
                })
            })

        }
    }
};