require ('../../css/loginPage.css');

import React from 'react';
import {browserHistory} from 'react-router';

export default class LoginPage extends React.Component {

    render() {
        return<div>
            <form className="loginForm form-horizontal">
                <div className="form-group">
                    <label  className="col-sm-2 control-label">账号</label>
                    <div className="col-sm-10">
                        <input type="email" placeholder='请输入用户名'  ref="userName" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label  className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control"  ref ="passWord" placeholder="Password"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">登录</button>
                    </div>
                </div>
            </form>
        </div>
    }
}