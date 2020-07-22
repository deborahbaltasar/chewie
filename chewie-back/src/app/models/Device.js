import Sequelize, { Model } from 'sequelize';


class Device extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            quantity: Sequelize.INTEGER
        }, {
            sequelize,
            paranoid: true
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.MeetingRoom, {foreignKey: 'fk_meeting_room'})
        this.belongsTo(models.DeviceCategory, {foreignKey: 'fk_device_category'})
    }
}

export default Device;