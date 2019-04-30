import express, { Request } from 'express';
import Controller from '../interfaces/controller.interface';

export default class UserController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/getUsers`, this.getUsers);
    }

    private getUsers(request: express.Request, response: express.Response, next: express.NextFunction) {
        response.send(JSON.stringify({}));
    }

}