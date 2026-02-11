const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      process.env.CLIENT_URL || "http://localhost:3000"
    ],
    methods: ["GET", "POST"]
  }
});
let connections = [];
let roomHistory = [];

// Serve static files from client folder
app.use(express.static(__dirname + '/../client/static'));
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/../client/static/html/client.html");
});

app.get('/room', function (req, res) {
    res.sendFile(__dirname + "/../client/static/html/room.html");
});

io.sockets.on('connection',  (socket)=> {
    console.log("Successful connection");
    connections.push(socket);

    socket.on('disconnect', ()=> {
        // BUGFIX: Corrected splice method - was splice(indexOf(socket, 1))
        connections.splice(connections.indexOf(socket), 1);
        console.log("disconnect");
    });

    socket.on('create', (data)=> {
        // Check if room already exists
        const existingRoom = roomHistory.filter(room => room.id === data)[0];
        if (!existingRoom) {
            roomHistory.push({id: data, messages: []});
        }
        socket.join(data);

        if (roomHistory !== [] && roomHistory.filter(room => room.id === data)[0].messages.length !== 0) {
            roomHistory.filter(room => room.id === data)[0].messages.forEach(data => {
                socket.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
            })
        }
    });

    socket.on('send mess', (data)=> {
        io.sockets.in(data.idroom).emit('add mess', {mess: data.mess, name: data.name, className: data.className});
        const room = roomHistory.filter(room => room.id === data.idroom)[0];
        if (room) {
            room.messages.push({mess: data.mess, name: data.name, className: data.className});
        }
    });
});
