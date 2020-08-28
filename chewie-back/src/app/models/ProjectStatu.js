import Sequelize, { Model } from 'sequelize';

class ProjectStatu extends Model {
  static init(sequelize) {
    super.init({
       
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Statu, {foreignKey: 'fk_status'});
  }
}

export default ProjectStatu;