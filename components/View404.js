/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 1:18 PM
 */

'use strict';

import React from 'react';
import { Link } from 'react-router';

class View404 extends React.Component {

    render() {
        return (
            <div id="page-not-found">
                <h1>404</h1>
                <p>We cannot find the page that you have requested.</p>
                <ul>
                    <li><Link to="/">Join as Audience</Link></li>
                    <li><Link to="/speaker">Start a presentation</Link></li>
                    <li><Link to="/board">View the board</Link></li>
                </ul>
            </div>
        );
    }
}

export default View404;