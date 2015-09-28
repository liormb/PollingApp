/**
 * Created by liormb on 9/27/15.
 */

'use strict';

import React from 'react';
import Display from './partials/Display';

class Audience extends React.Component {

    render() {
        const { status } = this.props;
        const isConnected = status === 'connected';
        return (
            <div>
                <Display isConnected={isConnected}>
                    <h1>Join the session</h1>
                </Display>
            </div>
        );
    }
}

export default Audience;