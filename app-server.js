/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 9:57 PM
 */

'use strict';

var _ = require('underscore');
var questions = require('./app-questions');
var express = require('express');
var io = require('socket.io');
var app = express();
var port = 3000;
var server;

// application state
var title = 'Untitled Presentation';
var currentQuestion = false;
var connections = [];
var audience = [];
var speaker = {};

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
            console.log('Lunch Event: disconnected | audience');
        } else if (this.id === speaker.id) {
            console.log('%s has left. %s is over', speaker.name, title);
            title = 'Untitled Presentation';
            speaker = {};
            io.sockets.emit('end', {
                title: title,
                speaker: ''
            });
            console.log('Lunch Event: disconnected | end');
        }
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('Disconnected: %s sockets remaining.', connections.length);
    });

    socket.on('join', function (payload) {
        var newMember = {
            id: this.id,
            name: payload.name,
            type: 'audience'
        };
        this.emit('joined', newMember);
        console.log('Lunch Event: joined');
        audience.push(newMember);
        io.sockets.emit('audience', audience);
        console.log('Lunch Event: audience');
    });

    socket.on('start', function (payload) {
        title = payload.title;
        speaker = {
            id: this.id,
            name: payload.name,
            title: title,
            type: 'speaker'
        };
        this.emit('joined', speaker);
        console.log('Lunch Event: joined');
        io.sockets.emit('start', {
            title: title,
            speaker: speaker.name
        });
        console.log('Lunch Event: start');
    });

    socket.on('ask', function (question) {
        currentQuestion = question;
        io.sockets.emit('ask', currentQuestion);
        console.log('Lunch Event: ask');
    });

    socket.emit('welcome', {
        title: title,
        audience: audience,
        speaker: speaker.name,
        questions: questions,
        currentQuestion: currentQuestion
    });
    console.log('Lunch Event: welcome');

    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
});
