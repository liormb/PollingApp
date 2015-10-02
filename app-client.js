/**
 * Name: Lior Elrom
 * Date: 9/27/15
 * Time: 9:57 PM
 */

'use strict';

import React  from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory  from 'history/lib/createBrowserHistory';

// Components
import App      from './components/App';
import Audience from './components/Audience';
import Speaker  from './components/Speaker';
import Board    from './components/Board';
import View404  from './components/View404';

// Variables
const routes = (
    <Route path="/" component={App}>
        <IndexRoute           component={Audience} />
        <Route path="speaker" component={Speaker}  />
        <Route path="board"   component={Board}    />
        <Route path="*"       component={View404}  />
    </Route>
);

React.render(
    <Router history={createBrowserHistory()}>{routes}</Router>,
    document.getElementById('react-container')
);
