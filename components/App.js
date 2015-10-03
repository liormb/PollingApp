/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 9:57 PM
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
            currentQuestion: false,
            title: '',
            speaker: '',
            audience: [],
            questions: [],
            member: {}
        };
        this.emit            = this.emit.bind(this);
        this.connect         = this.connect.bind(this);
        this.disconnect      = this.connect.bind(this);
        this.updateState     = this.updateState.bind(this);
        this.joined          = this.joined.bind(this);
        this.updateAudience  = this.updateAudience.bind(this);
        this.start           = this.start.bind(this);
        this.ask             = this.ask.bind(this);
    }

    componentWillMount() {
        this.socket = io(localPath);
        this.socket.on('connect'   , this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome'   , this.updateState);
        this.socket.on('joined'    , this.joined);
        this.socket.on('audience'  , this.updateAudience);
        this.socket.on('start'     , this.start);
        this.socket.on('end'       , this.updateState);
        this.socket.on('ask'       , this.ask);
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
                        name: member.name,
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

    start(presentation) {
        const { member } = this.state;
        if (member.type === 'speaker') {
            sessionStorage.title = presentation.title;
        }
        this.setState(presentation);
    }

    ask(question) {
        this.setState({ currentQuestion: question });
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

export default App;