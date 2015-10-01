/**
 * Created by liormb on 9/26/15.
 */

'use strict';

import React  from 'react';
import Router from 'react-router';
import { Route, IndexRoute } from 'react-router';
import createBrowserHistory  from 'history/lib/createBrowserHistory';

// Components
import App      from './components/App';
import Audience from './components/Audience';
import Speaker  from './components/Speaker';
import Board    from './components/Board';
import View404  from './components/View404';

// Variables
const el = document.getElementById('react-container');
let history = createBrowserHistory();

const routes = (
    <Route path="/" component={App}>
        <IndexRoute           component={Audience} />
        <Route path="speaker" component={Speaker}  />
        <Route path="board"   component={Board}    />
        <Route path="*"       component={View404}  />
    </Route>
);

React.render(<Router history={history}>{routes}</Router>, el);
