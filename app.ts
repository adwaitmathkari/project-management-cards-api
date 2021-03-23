import * as express from 'express';
import * as bodyParser from 'body-parser'
import { UserController } from './controllers/user.controller';

class App{
    public express: express.Application;
    public userController: UserController;

    constructor() {
        this.express = express();
        this.userController = new UserController();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/', (req, res) => {
            console.log('received basic request');
            res.send('Welcome to adwait\'s tasks api')
        });
        
        this.express.get('/api/user/:email', (req, res) => {
            console.log('received basic request');
            this.userController.getUser(req.params.email).then(data => res.json(data));
        });

        this.express.post('/api/user', (req, res) => {
            console.log(req.body);
            this.userController.createUser(req.body)
            .then(data => res.json(data))
            .catch((e)=> {
                res.status(400)
                res.send(e.message)
            })
        });
        
        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;