/**
 * Created by liormb on 9/26/15.
 */

'use strict';

const React = require('react');

class Header extends React.Component {

    render() {
        const { title, status, speaker } = this.props;

        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{title}</h1>
                    <p>{speaker}</p>
                </div>
                <div className="col-xs-2">
                    <span id="connection-status" className={status}></span>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    title   : React.PropTypes.string.isRequired,
    status  : React.PropTypes.string,
    speaker : React.PropTypes.string
};

Header.defaultProps = {
    status: 'disconnected',
    speaker: ''
};

export default Header;