//server side code

import {WebSocketServer} from 'ws';

const wss = new WebSocketServer ({ port: 8080});

wss.on("connection", function(socket){

    console.log("user connected")
    setInterval(() => {
        socket.send("current price is "+ Math.random());
    }, 5000)
    socket.on("message", (e) => {
        console.log(e.toString());
    })

})

