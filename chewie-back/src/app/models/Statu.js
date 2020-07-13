import Sequelize, { Model } from 'sequelize';

class Statu extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
  static associate(models) {
    this.hasMany(models.ProjectStatu, {foreignKey: 'fk_status'});
  }
}
export default Statu;