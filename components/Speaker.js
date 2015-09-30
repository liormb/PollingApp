/**
 * Created by liormb on 9/27/15.
 */

'use strict';

import React       from 'react';
import Display     from './partials/Display';
import JoinSpeaker from './partials/JoinSpeaker';

class Speaker extends React.Component {

    constructor(props) {
        super(props);
        this.renderSpeaker     = this.renderSpeaker.bind(this);
        this.renderJoinSpeaker = this.renderJoinSpeaker.bind(this);
    }

    renderSpeaker() {
        return (
            <Display>
                <p>Questions</p>
                <p>Attendance</p>
            </Display>
        );
    }

    renderJoinSpeaker() {
        const { emit } = this.props;
        return (
            <Display>
                <h2>Start the presentation</h2>
                <JoinSpeaker emit={emit} />
            </Display>
        );
    }

    render() {
        const { status, member } = this.props;
        const { name, type } = member;
        const isConnected = status === 'connected';

        return isConnected && (
            <Display>
                {name && type === 'member' ? this.renderSpeaker() : this.renderJoinSpeaker() }
            </Display>
        );
    }
}

Speaker.propTypes = {
    emit: React.PropTypes.func,
    status: React.PropTypes.string,
    member: React.PropTypes.object
};

Speaker.defaultProps = {
    status: 'disconnect',
    member: {}
};

export default Speaker;