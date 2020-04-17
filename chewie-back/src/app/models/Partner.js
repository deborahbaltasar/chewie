import Sequelize, { Model } from 'sequelize';


class Partner extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            number: Sequelize.STRING,
        },
        {
            sequelize,
        });

        return this;
    }

}

export default Partner;
