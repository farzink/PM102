module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        condition: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        nov: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });


    Products.associate = (models) => {
        //available: true;
        Products.hasMany(models.Images)
        Products.belongsTo(models.Profiles)
        Products.belongsTo(models.Categories)
    };


    Products.prototype.isInRadius = function() {

        this.getProfile()
            .then(profile => {
                console.log(profile.lat);
            })

        // var R = 6371e3; // metres
        // var φ1 = app.repositories.sql.ProductRepository.toRadian(points.first.lat);
        // var φ2 = app.repositories.sql.ProductRepository.toRadian(points.second.lat);
        // var Δφ = app.repositories.sql.ProductRepository.toRadian(points.second.lat - points.first.lat);
        // var Δλ = app.repositories.sql.ProductRepository.toRadian(points.second.lng - points.first.lng);

        // var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        //     Math.cos(φ1) * Math.cos(φ2) *
        //     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // var d = R * c;
        //console.log(d / 1000);
    };
    return Products;
};