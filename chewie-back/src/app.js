import express from 'express';

import routes from './routes';

import './database';

const cors = require('cors')

class App {
    constructor() {
        this.server = express();
        this.server.use(cors());
        this.server.options('*', cors()) // include before other routes

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }
    routes() {
        this.server.use(routes);
    }
}

export default new App().server;