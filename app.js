var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');
var path = require('path');

//===== Create the express server =========//
var app = express();
var server = http.Server(app);
//=====Add the socket.io library ontop the server ======//
var io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', ((socket) => {
    console.log("There was a connection!!");
    socket.on('disconnect', (() => {
        console.log('user disconnected!');
    }));
}));

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

//====Start server =========//
server.listen(3000, (() => {
    console.log(`
        Server is started and listening on port 3000
    `);
}));