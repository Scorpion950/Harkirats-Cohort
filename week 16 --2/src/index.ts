import {WebSocketServer, WebSocket} from 'ws'

const wss = new WebSocketServer({port:8080});

let userCount = 0;

let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {

    allSockets.push(socket);

    userCount = userCount + 1;

    console.log("user Connected #" + userCount);

    socket.on("message", (event) => {

        console.log("message received " + event.toString())

        for (let i = 0; i < allSockets.length; i++) {

            const s = allSockets[i];
        if (s) {
            s.send(event.toString() + ": sent from server");
        }
        }

    });

});