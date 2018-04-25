require ('../../css/homePage.css');

import React from 'react';
import {browserHistory} from 'react-router';

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:""
        }
    }

    onLoginBtn(){
      browserHistory.push('/loginPage');
    }

    onSearchBtn(e){
        e.preventDefault();
        const orderNumber=this.refs.orderNumber.value;
        if(!orderNumber){
            alert("订单号不得为空！")
        }
        this.props.onSearchBtn(orderNumber);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.searchOrderTip.tip==='success'){
            browserHistory.push(`/orderDetail`);
        }else{
            alert('订单不存在！')
        }

        console.log(nextProps.searchOrderTip)

    }
    render() {

        return <div className='page'>
            <nav className='head'>
                <p className="navbar-text" >LOG物流管理系统</p>
                <div>
                    <button type="button" onClick={this.onLoginBtn.bind(this)} className="btn">登录</button>
                        <span id='#id_a'> </span>

                </div>

            </nav>
            <form className="searchForm">
                    <input type="text" ref='orderNumber' className="searchInput"  placeholder='您可以输入订单号进行查询'/>
                <button  className="searchBtn" onClick={this.onSearchBtn.bind(this)}>查询</button>
            </form>

        </div>
    }
}