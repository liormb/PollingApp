/**
 * Created by liormb on 9/27/15.
 */

'use strict';

import React       from 'react';
import Display     from './partials/Display';
import JoinSpeaker from './partials/JoinSpeaker';
import Attendance  from './partials/Attendance';
import Questions   from './partials/Questions';

class Speaker extends React.Component {

    constructor(props) {
        super(props);
        this.renderSpeaker     = this.renderSpeaker.bind(this);
        this.renderJoinSpeaker = this.renderJoinSpeaker.bind(this);
    }

    renderSpeaker() {
        const { emit, audience, questions } = this.props;
        return (
            <Display>
                <Questions questions={questions} emit={emit}></Questions>
                <Attendance audience={audience}></Attendance>
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
                {name && type === 'speaker' ? this.renderSpeaker() : this.renderJoinSpeaker() }
            </Display>
        );
    }
}

Speaker.propTypes = {
    emit      : React.PropTypes.func,
    status    : React.PropTypes.string,
    member    : React.PropTypes.object,
    audience  : React.PropTypes.array,
    questions : React.PropTypes.array
};

Speaker.defaultProps = {
    status    : 'disconnect',
    member    : {},
    audience  : [],
    questions : []
};

export default Speaker;