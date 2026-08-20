import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    room: string;
}

interface Message {
    type: string;
    payload: {
        roomId?: string;
        message?: string;
    };
}

let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {
    socket.on("message", (event) => {
        const parsedMessage: Message = JSON.parse(event.toString());

        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId!,
            });
        }

        if (parsedMessage.type === "chat") {
            let currentUserRoom: string | null = null;

            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore
                if (allSockets[i].socket === socket) {
                    // @ts-ignore
                    currentUserRoom = allSockets[i].room;
                }
            }

            for (let i = 0; i < allSockets.length; i++) {
                // @ts-ignore
                if (allSockets[i].room == currentUserRoom) {
                    // @ts-ignore
                    allSockets[i].socket.send(parsedMessage.payload.message!);
                }
            }

            console.log(currentUserRoom);
        }
    });
});