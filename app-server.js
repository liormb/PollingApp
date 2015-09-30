/**
 * Created by liormb on 9/25/15.
 */

'use strict';

var _ = require('underscore');
var express = require('express');
var io = require('socket.io');
var app = express();
var connections = [];
var audience = [];
var speaker = {};
var title = 'Untitled Presentation';
var port = 3000;
var server;

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

server = app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});

io = io.listen(server);

io.sockets.on('connection', function (socket) {
    // if this socket disconnect, remove it from the socket's array
    socket.once('disconnect', function () {
        var member = _.findWhere(audience, { id: this.id });
        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
        }
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('Disconnected: %s sockets remaining.', connections.length);
    });

    socket.on('join', function (payload) {
        var member = {
            id: this.id,
            name: payload.name,
            type: 'member'
        };
        this.emit('joined', member);
        audience.push(member);
        io.sockets.emit('audience', audience);
    });

    socket.on('start', function (payload) {
        speaker = {
            id: this.id,
            name: payload.name,
            title: payload.title,
            type: 'speaker'
        };
        this.emit('joined', speaker);
        console.log('Presentation Started: %s by %s', payload.title, speaker.name);
    });

    socket.emit('welcome', {
        title: title
    });

    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
});
