/**
 * Created by liormb on 9/25/15.
 */

'use strict';

import React  from 'react';
import io     from 'socket.io-client';
import Header from './partials/Header';

const localPath = 'http://localhost:3000';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'disconnect',
            title: ''
        };
        this.connect    = this.connect.bind(this);
        this.disconnect = this.connect.bind(this);
        this.welcome    = this.welcome.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect',    this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome',    this.welcome);
    }

    connect() {
        this.setState({ status: 'connected' });
    }

    disconnect() {
        this.setState({ status: 'disconnected' });
    }

    welcome(serverState) {
        this.setState({ title: serverState.title });
    }

    render() {
        const { title, status } = this.state;
        return (
            <div>
                <Header title={title} status={status} />
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}

export default App;