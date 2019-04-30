"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
class SocketIOManager {
    constructor(server) {
        this.changeStream = user_model_1.default.watch();
        // this.initializeSocket(server);
        // this.initializeChangeStream();
    }
    initializeChangeStream() {
        this.changeStream.on('change', (change) => {
            console.log(change);
            this.io.emit('dbDataChange', change);
        });
    }
    initializeSocket(server) {
        const io = require('socket.io').listen(server);
        console.log("Recieved connection.");
        io.sockets.on("message", function (message) {
            console.log(message);
        });
    }
}
exports.default = SocketIOManager;
//# sourceMappingURL=socket.js.map