import Sequelize, { Model } from 'sequelize';

class Member extends Model {
    static init(sequelize) {
        super.init({


        },
        {
            sequelize,
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Project, {foreignKey: 'fk_project' });
        this.belongsTo(models.Partner, {foreignKey: 'fk_user'});
    }
}

export default Member;