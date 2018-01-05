module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
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
        // productId: {
        //     type: DataTypes.INTEGER
        // },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Images.associate = (models) => {
        Images.belongsTo(models.Products, { onDelete: 'cascade' })
    };
    return Images;
};