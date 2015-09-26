/**
 * Created by liormb on 9/26/15.
 */

'use strict';

const React = require('react');

class Header extends React.Component {

    render() {
        return (
            <header>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired
};

module.exports = Header;