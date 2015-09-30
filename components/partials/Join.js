/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 9:57 PM
 */

'use strict';

import React from 'react';
import { Link } from 'react-router';

class Join extends React.Component {

    constructor (props) {
        super(props);
        this.join = this.join.bind(this);
    }

    join() {
        const name = React.findDOMNode(this.refs.name).value;
        this.props.emit('join', {
            name: name
        });
    }

    render () {
        return (
            <form action="javascript:void(0)" onSubmit={this.join}>
                <label htmlFor="member-name-form">Full Name</label>
                <input
                    id="member-name-form"
                    className="form-control"
                    type="text"
                    placeholder="Enter your full name..."
                    ref="name"
                    required
                />
                <button className="btn btn-primary">Join</button>
                <Link to="/speaker">Join as speaker</Link>
            </form>
        );
    }
}

Join.propTypes = {
    emit: React.PropTypes.func.isRequired
};

export default Join;