/**
 * Created by liormb on 9/25/15.
 */

'use strict';

var express = require('express');
var io = require('socket.io');
var app = express();
var port = 3000;
var server;

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

server = app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});

io = io.listen(server);
io.sockets.on('connection', function (socket) {
    console.log('Connected: %s', socket.id);
});
