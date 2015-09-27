/**
 * Created by liormb on 9/27/15.
 */

'use strict';

const React = require('react');

class Audience extends React.Component {

    render() {
        const { title } = this.props;

        return (
            <h1>Audience : {title}</h1>
        );
    }
}

export default Audience;