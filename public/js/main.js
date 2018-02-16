import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import React from 'react';
import reducer from './reducers/index';

import middlewareLogin from './middlewares/login';

import Login from './containers/login';

const createMiddlewareStore = applyMiddleware(
    middlewareLogin
)(createStore);


const store = createMiddlewareStore(reducer);



render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
    </Router>
</Provider>, document.getElementById("content"));