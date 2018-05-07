import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import React from 'react';
import reducer from './reducers/index';

import middlewareHomePage from './middlewares/homePage';
import middlewareLoginPage from './middlewares/loginPage';

import HomePage from './containers/homePage';
import OrderDetail from './containers/orderDetail';
import LoginPage from './containers/loginPage';
import AdminPage from './containers/adminPage';
import SenderPage from './containers/senderPage';
import superAdminPage from './components/superAdminPage';
import poster from './components/poster';
import deliveryPage from './components/deliveryPage';
import scanningManPage from './components/scanningManPage';

const createMiddlewareStore = applyMiddleware(
    middlewareHomePage,
    middlewareLoginPage
)(createStore);


const store = createMiddlewareStore(reducer);



render(<Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/orderDetail/:id" component={OrderDetail}/>
        <Route path="/loginPage" component={LoginPage}/>
        <Route path="/adminPage/:id/:base" component={AdminPage}/>
        <Route path="/senderPage/:id" component={SenderPage}/>
        <Route path="/superAdminPage/:id" component={superAdminPage}/>
        <Route path="/posterPage/:id/:base" component={poster}/>
        <Route path="/deliveryPage/:id/:base/:name" component={deliveryPage}/>
        <Route path="/scanningPage/:id/:base" component={scanningManPage}/>
    </Router>
</Provider>, document.getElementById("content"));