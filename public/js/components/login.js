// require ('../../css/loginStyle.css');

import React from 'react';
import {browserHistory} from 'react-router';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:""
        }
    }
    onLogin(){
        const username=this.refs.userName.value;
        const password=this.refs.passWord.value;
        var info={
            "username":username,
            "password":password
        }
        if(!username||!password)
        {
            alert("用户名密码不能为空！");
            return;
        }

        this.props.onLogin(info);

    }
    //
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.loginTip[0])
    //     if (nextProps.loginTip[0]) {
    //         if(nextProps.loginTip[0].emp_position==="1"){
    //             browserHistory.push(`/adminPage?emp_id=${nextProps.loginTip[0].emp_id}`);
    //         }else{
    //             browserHistory.push(`/conductorPage?emp_id=${nextProps.loginTip[0].emp_id}`);
    //         }
    //     } else{
    //         alert("登录失败！");
    //     }
    // }
    // changeName(){
    //     this.setState({
    //         name:this.refs.userName.value
    //     })
    // }
    // changePassword(){
    //     this.setState({
    //         password:this.refs.passWord.value
    //     })
    // }

    render() {

        return <div>
            <h1>物流管理系统</h1>
            <div>
                <a href='#'>登录</a>
            </div>
            <form>
                <input type='text' placeholder='您可以输入订单号进行查询'/>
                <button onClick={this.onLogin.bind(this)}>查询</button>
            </form>
            <from>
                账号<input type='text' placeholder='请输入用户名'  ref="userName"/>
                密码<input type='text' placeholder='请输入密码' ref ="passWord"/>
                <button>登录</button>
            </from>
        </div>
    }
}