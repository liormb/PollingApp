/**
 * Created by liormb on 9/27/15.
 */

'use strict';

import React   from 'react';
import Display from './partials/Display';
import Join    from './partials/Join';

class Audience extends React.Component {

    render() {
        const { status, emit } = this.props;
        const isConnected = status === 'connected';
        return (
            <div>
                <Display isConnected={isConnected}>
                    <h1>Join the session</h1>
                    <Join emit={emit} />
                </Display>
            </div>
        );
    }
}

Audience.propTypes = {
    status: React.PropTypes.string,
    emit: React.PropTypes.func.isRequired
};

Audience.defaultProps = {
    status: 'disconnect'
};

export default Audience;