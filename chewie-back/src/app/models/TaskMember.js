import Sequelize, { Model } from 'sequelize';

class TaskMember extends Model {
    static init(sequelize) {
        super.init({


        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Member, {foreignKey: 'fk_member' });
        this.belongsTo(models.Task, {foreignKey: 'fk_task'});
    }
}

export default TaskMember;