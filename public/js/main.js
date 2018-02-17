import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import React from 'react';
import reducer from './reducers/index';

import middlewareLogin from './middlewares/homePage';

import HomePage from './containers/homePage';
import OrderDetail from './containers/orderDetail';
import LoginPage from './containers/loginPage';
import AdminPage from './containers/adminPage';
import SenderPage from './containers/senderPage';

const createMiddlewareStore = applyMiddleware(
    middlewareLogin
)(createStore);


const store = createMiddlewareStore(reducer);



render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/orderDetail" component={OrderDetail}/>
        <Route path="/loginPage" component={LoginPage}/>
        <Route path="/adminPage" component={AdminPage}/>
        <Route path="/senderPage" component={SenderPage}/>
    </Router>
</Provider>, document.getElementById("content"));