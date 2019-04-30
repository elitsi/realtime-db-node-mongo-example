import * as bodyParser from 'body-parser';
import express from 'express';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middlewares/error.middleware';
import mongoose from 'mongoose';
import SockerIOManager from './core/socket';

class App {
    public app: express.Application;
    private socketManager: SockerIOManager;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initiateDBConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initiateDBConnection() {
        mongoose.connect('mongodb://localhost/realtime-user-db?replicaSet=rs0', { useNewUrlParser: true });
    }

    public listen() {
        const port = process.env.PORT || 3000;
        const server = this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
        
        // Initialize socket.io
        this.socketManager = new SockerIOManager(server);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;