import Sequelize, { Model } from 'sequelize';

class Emmiter extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cnpj: Sequelize.STRING,
        },
        {
            sequelize,
        });

        return this;
   }


}
    
export default Emmiter;