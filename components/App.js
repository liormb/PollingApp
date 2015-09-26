/**
 * Created by liormb on 9/25/15.
 */

'use strict';

const React = require('react');
const io = require('socket.io-client');
const Header = require('./partials/Header');
const localPath = 'http://localhost:3000';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.connect    = this.connect.bind(this);
        this.disconnect = this.connect.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
    }

    connect() {
        console.log('Connected: ' + this.socket.id);
    }

    disconnect() {
        this.setState({
            status: 'disconnected'
        });
    }

    render() {
        return (
            <div>
                <Header title="New Header" />
            </div>
        );
    }
}

module.exports = App;