/**
 * Created by liormb on 9/25/15.
 */

'use strict';

const React = require('react');
const io = require('socket.io-client');
const localPath = 'http://localhost:3000';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.connect = this.connect.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect', this.connect);
    }

    connect() {
        console.log('Connected: ' + this.socket.id);
    }

    render() {
        return (
            <h1>Hello World from React</h1>
        );
    }
}

App.propTypes = {
    socket: React.PropTypes.object
};

App.default = {
    socket: {}
};

module.exports = App;