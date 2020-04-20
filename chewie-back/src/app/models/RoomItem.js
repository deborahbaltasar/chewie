import Sequelize, { Model } from 'sequelize';

class RoomItem extends Model {
    static init(sequelize) {
        super.init({
            quantity: Sequelize.FLOAT,
        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.MeetingRoom, {foreignKey: 'fk_meeting_room'});
        this.belongsTo(models.Item, {foreignKey: 'fk_item', as: 'info'});
    }

}

export default RoomItem;