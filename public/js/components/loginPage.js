require ('../../css/loginPage.css');

import React from 'react';
import {browserHistory} from 'react-router';

export default class LoginPage extends React.Component {

    onLogin(){
        let username = this.refs.userName.value;
        let password = this.refs.passWord.value;
        let userType = this.refs.userType.value;

        this.props.onLogin({username,password,userType})
    }


    render() {
        return<div>
            <form className="loginForm form-horizontal">
                <div className="form-group">
                    <label  className="col-sm-2 control-label">账号</label>
                    <div className="col-sm-10">
                        <input type="text" placeholder='请输入用户名'  ref="userName" className="form-control" />
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
                        <select className="form-control" ref ="userType">
                            <option>揽件员</option>
                            <option>派送员</option>
                            <option>站点扫描员</option>
                            <option>站点管理员</option>
                            <option>系统管理员</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <label  className="col-sm-2 control-label">用户类型</label>

                        <button onClick={this.onLogin.bind(this)} className="btn btn-default">登录</button>
                    </div>
                </div>

            </form>
        </div>
    }
}