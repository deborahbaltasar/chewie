import Sequelize, { Model } from 'sequelize';

class Expense extends Model {
  static init(sequelize) {
    super.init({
      price: Sequelize.DOUBLE,
      reason: Sequelize.STRING,
      date: Sequelize.DATE,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, {foreignKey: 'fk_project'});
  }
}
    
export default Expense;
