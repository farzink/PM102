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
        },
        categoryId: {
            type: DataTypes.INTEGER,
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
    }, {
        classMethods: {
            associate: (models) => {
                available: true;
                Products.belongsTo(models.Users);
                Products.belongsTo(models.Categories, { foreignKey: 'categoryId', targetKey: 'id' });
            }
        }
    });
    return Products;
};