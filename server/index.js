import express from 'express';
import http from 'http';
import { Server as SockerServer } from "socket.io";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new SockerServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Client connected");
    console.log(socket.id);

    socket.on("message", (body) => {
        console.log(body);
        socket.broadcast.emit("message", {
            body,
            from: socket.id.slice(8),
            date: new Date().toLocaleTimeString([], { timeStyle: 'short' })
        });
    });
})



server.listen(port, () => {
    console.log('server started ', port);
});
