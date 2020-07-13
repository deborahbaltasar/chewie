import Sequelize, { Model } from 'sequelize';

class Invoice extends Model {
    static init(sequelize) {
        super.init({
            price: Sequelize.DOUBLE,
            payment_date: Sequelize.DATE,
            issue_date: Sequelize.DATE,
            request_date: Sequelize.DATE,
            status: Sequelize.STRING,
        },
        {
            sequelize,
        });

        return this;
   }

   static associate(models) {
    this.belongsTo(models.Emmiter, {foreignKey: 'fk_emmiter'});
    this.belongsTo(models.Project, {foreignKey: 'fk_project'});
   }
}
    
export default Invoice;
