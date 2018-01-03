module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("Categories", {
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        }
    });



    Categories.associate = (models) => {
        Categories.hasMany(models.Products);
    };


    return Categories;
};