/**
 * Created by liormb on 9/26/15.
 */

'use strict';

const React = require('react');

class Header extends React.Component {

    render() {
        const { title } = this.props;

        return (
            <header>
                <h1>{title}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title  : React.PropTypes.string.isRequired,
    status : React.PropTypes.string.isRequired
};

export default Header;