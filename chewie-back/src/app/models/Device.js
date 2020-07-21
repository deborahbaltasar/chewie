'use strict';
const {Model} = require('sequelize');


class Device extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            quantity: DataTypes.INTEGER
        }, {
            sequelize,
            modelName: 'device',
        });
    }

    static associate(models) {
        this.belongsTo(models.DeviceCategory, {foreignKey: 'fk_device_category'})
        this.belongsTo(models.MeetingRoom, {foreignKey: 'fk_meeting_room'})
    }
}

export default Device;