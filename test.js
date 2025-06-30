const { io } = require("socket.io-client");

const socket = io("ws://localhost:3000/chat");

socket.on("connect", () => {
    console.log("Connected to WebSocket server");

    socket.emit("message", {
        userId: 1,
        content: "Hello from test client",
    });
});

socket.on("message", (data) => {
    console.log("Message received:", data);
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});
