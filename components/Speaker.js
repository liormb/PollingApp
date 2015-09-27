/**
 * Created by liormb on 9/27/15.
 */

'use strict';

const React = require('react');

class Speaker extends React.Component {

    render() {
        const { status } = this.props;

        return (
            <h1>Speaker : {status}</h1>
        );
    }
}

export default Speaker;