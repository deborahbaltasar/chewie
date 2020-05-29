import Sequelize, { Model } from 'sequelize';

class Checklist extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        done: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Task, { foreignKey: 'fk_task' });
  }
}
export default Checklist;