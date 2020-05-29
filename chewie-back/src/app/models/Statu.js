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
}
export default Statu;