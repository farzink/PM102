import mongoose from 'mongoose';

module.exports = app => {
    const Address = app.models.Address;
    var AddressModel = mongoose.model("Address");
    var helper = app.models.db.helper;

    return {
        //Get one Address
        findById: (model, result) => {
            let query = AddressModel.find(helper.getId(model), 
            function(err, address){
                query.select(Address);
                query.exec(function (err, address){
                    try
                    {
                        return result(helper.success(address));
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
            let query = AddressModel.find({}, 
            function(err, address){
                query.select(Address);
                query.exec(function (err, address){
                    try
                    {
                        return result(helper.success(address));
                    }
                    catch(err)
                    {
                        return result(helper.failed(err.message));
                    }
                })
            });
        },

        //Delete Address
        deleteById: (model, result) => {
            AddressModel.findByIdAndRemove({ _id: model.id },
                function (err, address) {
                    try {
                        if (!err && address !== null) {
                            return result(helper.success(address));
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

        //Edit Address
        putById: (model, params, result) => {
            AddressModel.findByIdAndUpdate(helper.getId(params), model,
                function (model) {
                    try {
                        return result(helper.success());
                    }
                    catch (err) {
                        return result(helper.failed(err.message));
                    }
                });
        },
        
        //Add Address
        add: (model, result) => {
            let address = new AddressModel();
            address.name = model.name;
            address.description = model.description;
            address.createdOn = Date.now();
            try {
                address.save();
                return result(helper.success(address));
            }
            catch(err) {
                return result(helper.failed(err.message));
            }
            
        }
    };
};