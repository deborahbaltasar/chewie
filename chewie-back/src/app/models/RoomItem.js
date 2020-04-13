import Sequelize, { Model } from 'sequelize';

class RoomItem extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            quantity: Sequelize.STRING,
        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.MeetingRoom, {foreignKey: 'meeting_room_id'});
    }

}

export default RoomItem;