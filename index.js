const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io').listen(server);
let connections = [];
let roomHistory = [];

app.use(express.static('static'));
server.listen(3000);

    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/static/formUser/client.html");
    });
    app.get('/room', function (req, res) {
        res.sendFile(__dirname + "/static/formRoom/room.html");
    });

io.sockets.on('connection',  (socket)=> {
    console.log("Successful connection");
    connections.push(socket);

    socket.on('disconnect', ()=> {
        connections.splice(connections.indexOf(socket, 1));
        console.log("disconnect");
    });

    socket.on('create', (data)=> {
        roomHistory.push({id:data,messages:[]});
        socket.join(data);

        if (roomHistory!==[] && roomHistory.filter(room => room.id === data)[0].messages.length !== 0) {
            roomHistory.filter(room => room.id === data)[0].messages.forEach(data => {
                socket.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
            })
        }
    });
    socket.on('send mess', (data)=> {
            io.sockets.in(data.idroom).emit('add mess', {mess: data.mess, name: data.name, className: data.className});
            roomHistory.filter(room => room.id === data.idroom)[0].messages.push({mess: data.mess, name: data.name, className: data.className});


    });

});

