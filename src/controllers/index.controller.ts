import express from 'express';
import Controller from '../interfaces/controller.interface';
import * as path from 'path';

export default class IndexController implements Controller {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getMainPage);
        this.router.get(`${this.path}home`, this.getMainPage);

    }

    private getMainPage(request: express.Request, response: express.Response, next: express.NextFunction) {
        response.sendFile(path.resolve(__dirname, ));
    }

}