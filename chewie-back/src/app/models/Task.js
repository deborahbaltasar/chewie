 
import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      note: Sequelize.STRING,
      deliver_date: Sequelize.DATE,
      finished_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    }, {
      sequelize,
    }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, { foreignKey: 'fk_project' });
    this.hasMany(models.Checklist, { foreignKey: 'fk_task' });
    this.hasMany(models.TaskMember, { foreignKey: 'fk_task' });  
  }
}

export default Task;