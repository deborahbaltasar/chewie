import Sequelize, { Model } from 'sequelize';

class Project extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            description: Sequelize.STRING,
            client_name: Sequelize.STRING,
            type: Sequelize.STRING,
            start: Sequelize.DATE,
            end: Sequelize.DATE,
            value: Sequelize.STRING,
            responsible: Sequelize.STRING,
            status: Sequelize.STRING,
            comments: Sequelize.STRING,
            canceled_at: Sequelize.DATE,

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

export default Project;