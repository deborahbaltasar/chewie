import Sequelize, { Model } from 'sequelize';

class DeviceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static init(sequelize){
        super.init({
            name: Sequelize.STRING
        }, {
            sequelize,
            paranoid: true
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Device, {foreignKey: 'fk_device_category', sourceKey: 'id'})
    }
}

export default DeviceCategory;