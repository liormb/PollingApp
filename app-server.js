/**
 * Created by liormb on 9/25/15.
 */

'use strict';

var express = require('express');
var io = require('socket.io');
var app = express();
var connections = [];
var port = 3000;
var server;

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

server = app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});

io = io.listen(server);
io.sockets.on('connection', function (socket) {
    socket.once('disconnect', function () {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('Disconnected: %s sockets remaining.', connections.length);
    });
    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
});