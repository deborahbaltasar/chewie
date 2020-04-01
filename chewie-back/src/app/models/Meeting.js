import Sequelize, { Model } from 'sequelize';

class Meeting extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
            canceled_at: Sequelize.DATE,

        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.MeetingRoom, {foreignKey: 'meetingRoom_id', as: 'meetingRoom' });
    }

}

export default Meeting;