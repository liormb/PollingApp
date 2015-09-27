/**
 * Created by liormb on 9/26/15.
 */

'use strict';

import React  from 'react';
import Router from 'react-router';
import { Route, IndexRoute } from 'react-router';

// Components
import App      from './components/App';
import Audience from './components/Audience';
import Speaker  from './components/Speaker';
import Board    from './components/Board';

// Variables
const el = document.getElementById('react-container');

const routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Audience} />
            <Route path="speaker" component={Speaker} />
            <Route path="board"   component={Board} />
        </Route>
    </Router>
);

React.render(routes, el);
