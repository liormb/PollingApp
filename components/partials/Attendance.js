/**
 * Name: Lior Elrom
 * Date: 10/1/15
 * Time: 9:30 PM
 */

'use strict';

import React from 'react';

class Attendance extends React.Component {

    constructor (props) {
        super(props);
        this.renderMembers = this.renderMembers.bind(this);
    }

    renderMembers() {
        const { audience } = this.props;
        return audience.map((member, index) => {
            return (
                <tr key={index}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                </tr>
            );
        });
    }

    render () {
        const { audience } = this.props;
        return (
            <div>
                <h2>Attendance - {audience.length} members</h2>
                <table className="table table-stiped">
                    <thead>
                        <tr>
                            <th>Socket ID</th>
                            <th>Audience Member Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMembers()}
                    </tbody>
                </table>
            </div>
        );
    }
}

Attendance.propTypes = {
    audience: React.PropTypes.array
};

Attendance.defaultProps = {
    audience: []
};

export default Attendance;