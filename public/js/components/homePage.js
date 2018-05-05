require('../../css/homePage.css');

import React from 'react';
import {browserHistory} from 'react-router';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            showLoginForm: false
        }
    }

    onLoginBtn() {
        this.setState({
            showLoginForm: true

        })
    }

    onLoginRequest(e) {
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;
        // browserHistory.push("/superAdminPage");
        // browserHistory.push("/posterPage");
        fetch('/login',
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.ret) {
                    switch (myJson.data.post) {
                        case "系统管理员":
                            browserHistory.push(`/superAdminPage/${myJson.data.id}`);
                            break;
                        case "派送员":
                            browserHistory.push(`/posterPage/${myJson.data.id}/${myJson.data.base}`);
                            break;
                        case "站点管理员":
                            browserHistory.push(`/adminPage/${myJson.data.id}/${myJson.data.base}`);
                            break;
                        case "揽件员":
                            browserHistory.push(`/deliveryPage/${myJson.data.id}/${myJson.data.base}`);
                            break;
                        case "站点扫描员":
                            browserHistory.push(`/scanningPage/${myJson.data.id}/${myJson.data.base}`);
                            break;
                    }
                } else {
                    alert(myJson.errorMessage);
                }
            });
        // browserHistory.push("/deliveryPage");

        // console.log({username,password})

    }

    onSearchBtn(e) {
        e.preventDefault();
        const orderNumber = this.refs.orderNumber.value;

        fetch(`/findOrderById?id=${orderNumber}`,
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.length) {
                    browserHistory.push(`/orderDetail/${orderNumber}`);
                } else {
                    alert("订单不存在！")
                }
            });
    }

    onShadowClick() {
        this.setState({
            showLoginForm: false
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.searchOrderTip.tip === 'success') {
    //         browserHistory.push(`/orderDetail`);
    //     } else {
    //         alert('订单不存在！')
    //     }
    //
    //     console.log(nextProps.searchOrderTip)
    //
    // }

    render() {
        const isShowLoginForm = this.state.showLoginForm;
        const container = !isShowLoginForm ? <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span className="loginBtn" onClick={this.onLoginBtn.bind(this)}>登录</span>
                </nav>
                <form className="searchForm">
                    <input type="text" className="searchInput" placeholder='您可以输入订单号进行查询' ref="orderNumber"/>
                    <button className="searchBtn" onClick={this.onSearchBtn.bind(this)}>马上查单</button>
                </form>

            </div>
        </div> : <div className="content">
            <div className='page'>
                <div className="shadowBox" onClick={this.onShadowClick.bind(this)}></div>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span className="loginBtn" onClick={this.onLoginBtn.bind(this)}>登录</span>
                </nav>
                <form className="loginForm">
                    <input type="text" className="username" placeholder='请输入工号' ref='username'/>
                    <input type="password" className="password" ref='password' placeholder='请输入密码'/>
                    <button className="loginBtn2" onClick={this.onLoginRequest.bind(this)}>登录</button>
                </form>
            </div>
        </div>;

        return <div>
            {container}
        </div>
    }

}