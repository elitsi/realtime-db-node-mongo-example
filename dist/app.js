"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_1 = __importDefault(require("./core/socket"));
class App {
    constructor(controllers) {
        this.app = express_1.default();
        this.initiateDBConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    initiateDBConnection() {
        mongoose_1.default.connect('mongodb://localhost/realtime-user-db', { useNewUrlParser: true });
    }
    listen() {
        const port = process.env.PORT || 3000;
        const server = this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        });
        // Initialize socket.io
        this.socketManager = new socket_1.default(server);
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map