/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 6:34 PM
 */

'use strict';

import React from 'react';

class Display extends React.Component {

    render () {
        const { isConnected } = this.props;
        return isConnected && (<div>{this.props.children}</div>);
    }
}

Display.propTypes = {
    isConnected: React.PropTypes.bool
};

Display.defaultProps = {
    isConnected: false
};

export default Display;