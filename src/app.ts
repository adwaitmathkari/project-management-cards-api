import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserController } from './controllers/user.controller';
import { CardController } from './controllers/card.controller';
import { connectDB } from '../config/db.config';

class App{
    public express: express.Application;
    public userController: UserController;
    public cardController: CardController;

    constructor() {
        this.express = express();
        this.userController = new UserController(this.express);
        this.cardController = new CardController(this.express);
        this.middleware();
        this.routes();
        connectDB();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        // configure routes
        this.userController.configureRoutes();
        this.cardController.configureRoutes();

        this.express.get('/', (req, res) => {
            console.log('received basic request');
            res.send('Welcome to adwait\'s tasks api');
        });

        // handle undefined routes
        this.express.use('*', (req, res, next) => {
            res.send('Make sure url is correct!!!');
        });
    }
}

export default new App().express;