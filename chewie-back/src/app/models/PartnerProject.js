import Sequelize, { Model } from 'sequelize';

class PartnerProject extends Model {
  static init(sequelize) {
    super.init({

    }, {
      sequelize,
    }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, {foreignKey: 'project_id' });
    this.belongsTo(models.Partner, {foreignKey: 'partner_id'});
  }
}

export default PartnerProject;