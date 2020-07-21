const { Model } = require('sequelize');

class DeviceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static init(sequelize){
        super.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'device_category',
        });
    }

    static associate(models) {
        this.hasMany(models.Device, {foreignKey: 'fk_device_category', sourceKey: 'id'})
    }
}

export default DeviceCategory;