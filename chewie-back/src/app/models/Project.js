import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      description: Sequelize.TEXT,
      client_name: Sequelize.STRING,
      type: Sequelize.STRING,
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      plots: Sequelize.REAL,
      value: Sequelize.BIGINT,
      comments: Sequelize.TEXT,
      canceled_at: Sequelize.DATE,

    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.MeetingRoom, {foreignKey: 'meeting_room_id'});
    this.belongsTo(models.User, {foreignKey: 'responsible'});
    this.belongsTo(models.Statu, { foreignKey: 'status_id' });
    this.hasMany(models.ProjectStatu, {foreignKey: 'fk_project' ,sourceKey: 'id'});
    this.hasMany(models.Task, { foreignKey: 'fk_project' });
    this.hasMany(models.Member, { foreignKey: 'fk_project' });
  }
}

export default Project;