/**
 * Name: Lior Elrom
 * Date: 9/29/15
 * Time: 7:02 PM
 */

'use strict';

import React from 'react';

class JoinSpeaker extends React.Component {

    constructor (props) {
        super(props);
        this.start = this.start.bind(this);
    }

    start() {
        const name  = React.findDOMNode(this.refs.name).value;
        const title = React.findDOMNode(this.refs.title).value;
        this.props.emit('start', { name, title });
    }

    render () {
        return (
            <form action="javascript:void(0)" onSubmit={this.start}>
                <div className="form-group">
                    <label htmlFor="member-name-form">Full Name</label>
                    <input
                        id="member-name-form"
                        className="form-control"
                        type="text"
                        placeholder="Full name"
                        ref="name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="presentation-title-form">Presentation Title</label>
                    <input
                        id="presentation-title-form"
                        className="form-control"
                        type="text"
                        placeholder="Enter a title for this presentation"
                        ref="title"
                        required
                    />
                    <button className="btn btn-primary">Start Presentation</button>
                </div>
            </form>
        );
    }
}

JoinSpeaker.propTypes = {
    emit: React.PropTypes.func.isRequired
};

export default JoinSpeaker;