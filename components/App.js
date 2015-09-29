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
            title: '',
            member: {},
            audience: []
        };
        this.connect         = this.connect.bind(this);
        this.disconnect      = this.connect.bind(this);
        this.welcome         = this.welcome.bind(this);
        this.joined          = this.joined.bind(this);
        this.updateAudience  = this.updateAudience.bind(this);
        this.emit            = this.emit.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect',    this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome',    this.welcome);
        this.socket.on('joined',     this.joined);
        this.socket.on('audience',   this.updateAudience);
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

    joined(member) {
        this.setState({ member: member });
    }

    updateAudience(audience) {
        this.setState({ audience: audience });
    }

    // Pass down to the Join form component
    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    render() {
        const { title, status } = this.state;
        const payload = Object.assign(this.state, {
            emit: this.emit
        });

        return (
            <div>
                <Header title={title} status={status} />
                {React.cloneElement(this.props.children, payload)}
            </div>
        );
    }
}

export default App;