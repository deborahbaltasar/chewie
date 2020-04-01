import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import MeetingRoom from '../app/models/MeetingRoom';
import Meeting from '../app/models/Meeting';

import databaseConfig from '../config/database';

const models = [User, File, MeetingRoom, Meeting];

class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new Sequelize(databaseConfig)

        models.map(model => model.init(this.connection));
        models.map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();