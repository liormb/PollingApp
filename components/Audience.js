/**
 * Created by liormb on 9/27/15.
 */

'use strict';

import React   from 'react';
import Display from './partials/Display';
import Join    from './partials/Join';

class Audience extends React.Component {

    constructor(props) {
        super(props);
        this.renderWelcome       = this.renderWelcome.bind(this);
        this.renderJoin          = this.renderJoin.bind(this);
        this.renderDisplayMember = this.renderDisplayMember.bind(this);
    }

    renderWelcome() {
        const { audience, member } = this.props;
        return (
            <Display>
                <h1>Welcome {member.name}</h1>
                <p>{audience.length} audience members connected</p>
                <p>Questions will appear here.</p>
            </Display>
        );
    }

    renderJoin() {
        const { emit } = this.props;
        return (
            <Display>
                <h1>Join the session</h1>
                <Join emit={emit} />
            </Display>
        );
    }

    renderDisplayMember() {
        const { name } = this.props.member;
        return name ? this.renderWelcome() : this.renderJoin();
    }

    render() {
        const { status } = this.props;
        const isConnected = status === 'connected';
        return isConnected && (
            <Display>{this.renderDisplayMember()}</Display>
        );
    }
}

Audience.propTypes = {
    emit     : React.PropTypes.func,
    status   : React.PropTypes.string,
    member   : React.PropTypes.object,
    audience : React.PropTypes.array
};

Audience.defaultProps = {
    status   : 'disconnect',
    member   : {},
    audience : []
};

export default Audience;