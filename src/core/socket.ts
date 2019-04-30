import { Http2Server } from "http2";
import User from '../models/user.model';
import { Socket } from "socket.io";
import { ChangeStream } from "mongodb";


export default class SocketIOManager {
    private io: Socket;
    private changeStream: ChangeStream;

    constructor(server: Http2Server) {
        this.changeStream = User.watch();
        this.initializeSocket(server);
        this.initializeChangeStream();
    }

    private initializeChangeStream() {
        this.changeStream.on('change', (change) => {
            console.log(change);
            this.io.emit('dbDataChange', change);
        }); 
    }

    private initializeSocket(server: Http2Server) {
        const io = require('socket.io').listen(server);
        console.log("Recieved connection.");
        io.sockets.on("message", function (message: any) {
            console.log(message);
        });
    }
}