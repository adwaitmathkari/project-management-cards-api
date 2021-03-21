import * as express from 'express';
import * as bodyParser from 'body-parser'

class App{
    public express: express.Application;

    constructor() {
        this.express = express();
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
        

        
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;