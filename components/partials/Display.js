/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 6:34 PM
 */

'use strict';

import React from 'react';

class Display extends React.Component {

    render () {
        return (<div>{this.props.children}</div>);
    }
}

export default Display;