import Sequelize, { Model } from 'sequelize';

class Meeting extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            start: Sequelize.DATE,
            end: Sequelize.DATE,
            canceled_at: Sequelize.DATE,

        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id' });
        this.belongsTo(models.MeetingRoom, {foreignKey: 'meeting_room_id'});
        this.belongsTo(models.Project, { foreignKey: 'fk_project' });
    }

}

export default Meeting;