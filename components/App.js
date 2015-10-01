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
            speaker: '',
            audience: [],
            member: {}
        };
        this.emit            = this.emit.bind(this);
        this.connect         = this.connect.bind(this);
        this.disconnect      = this.connect.bind(this);
        this.updateState     = this.updateState.bind(this);
        this.joined          = this.joined.bind(this);
        this.updateAudience  = this.updateAudience.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect'   , this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome'   , this.updateState);
        this.socket.on('joined'    , this.joined);
        this.socket.on('audience'  , this.updateAudience);
        this.socket.on('start'     , this.updateState);
    }

    // Pass down to the Join form component
    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    connect() {
        let member;
        let memberType;

        if (this.props.status !== 'connected') {
            sessionStorage.clear();
        } else {
            member = sessionStorage.member && JSON.parse(sessionStorage.member);
            memberType = member && member.type;

            switch (memberType) {
                case 'audience':
                    this.emit('join', member);
                    break;
                case 'speaker':
                    this.emit('start', {
                        name : member.name,
                        title: sessionStorage.title
                    });
                    break;
            }
        }
        this.setState({ status: 'connected' });
    }

    disconnect() {
        this.setState({
            title: 'disconnected',
            status: 'disconnected',
            speaker: ''
        });
    }

    updateState(serverState) {
        this.setState(serverState);
    }

    joined(member) {
        // Save the joined member to the browser's session
        sessionStorage.member = JSON.stringify(member);
        this.setState({ member: member });
    }

    updateAudience(newAudience) {
        this.setState({ audience: newAudience });
    }

    render() {
        const payload = Object.assign(this.state, {
            emit: this.emit
        });

        return (
            <div>
                <Header {...this.state} />
                {React.cloneElement(this.props.children, payload)}
            </div>
        );
    }
}

App.defaultProps = {
    name   : '',
    title  : '',
    type   : '',
    status : 'disconnected'
};

export default App;