import React from 'react';
import {browserHistory} from 'react-router';
import CityInput from './cityInput';
require('../../css/deliveryPage.css');


export default class DeliveryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.params.id,
            base: props.params.base,
            name: props.params.name,
            orderId: ""
        }

    }

    componentDidMount() {

        fetch('/getAllOrder',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    orderId: parseInt(myJson[myJson.length - 1]._id) + 1
                });
            });
    }

    onSubmitBtnClick() {
        const senderName = this.refs.senderName.value;
        const senderCompany = this.refs.senderCompany.value;
        const senderFixPhone = this.refs.senderFixPhone.value;
        const senderTel = this.refs.senderTel.value;
        const senderAddr = this.refs.senderAddr.value;
        const senderAddrDetail = this.refs.senderAddrDetail.value;
        const senderThingsType = this.refs.senderThingsType.value;
        const thingsWeight = this.refs.senderWeight.value;

        const receiverName = this.refs.receiverName.value;
        const receiverCompany = this.refs.receiverCompany.value;
        const receiverFixPhone = this.refs.receiverFixPhone.value;
        const receiverTel = this.refs.receiverTel.value;
        const receiverAddr = this.refs.receiverAddr.value;
        const receiverAddrDetail = this.refs.receiverAddrDetail.value;
        let myDate = new Date();
        let date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`;
        let time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
        const result = {
            _id: this.state.orderId,
            senderInfo: {
                "name": senderName,
                "company": senderCompany,
                "fixPhone": senderFixPhone,
                "tel": senderTel,
                "addr": senderAddr,
                "addrDetail": senderAddrDetail,
                "thingsType": senderThingsType,
                "weight": thingsWeight
            },
            receiverInfo: {
                "name": receiverName,
                "company": receiverCompany,
                "fixPhone": receiverFixPhone,
                "tel": receiverTel,
                "addr": receiverAddr,
                "addrDetail": receiverAddrDetail
            },
            orderStatus: [
                {
                    "date": date,
                    "state": [
                        {
                            "time": time,
                            "state": "已揽件",
                            "remark": `揽件员:${this.state.name}`,
                            "personBase": this.state.base,
                            "dealPersonId": this.state.id
                        }
                    ]
                }
            ]
        };

        if (!senderName || !senderTel || !senderAddr || !senderAddrDetail || !senderThingsType || !thingsWeight || !receiverName || !receiverTel || !receiverAddr || !receiverAddrDetail) {
            alert("必填项不得为空！")
        }else{
            fetch('/addOrder',
                {
                    method: 'POST',
                    body: JSON.stringify(result),
                    headers: new Headers({'Content-Type': 'application/json'})
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    if (myJson.ret) {
                        alert("下单成功！")
                    } else {
                        alert("下单失败！")
                    }
                });
        }



    }

    onLogOut() {
        browserHistory.push('/');
    }

    render() {


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{this.state.id}</span><span>(揽件员/{this.state.base})</span></span>
                    <span className="logoutBtn" onClick={this.onLogOut.bind(this)}>登出</span>
                </nav>
                <div className="deliverMain">

                    <div className='sender'>
                        <div className="orderNumberStyle">订单号：{this.state.orderId}</div>
                        <div className='formTitle'><span>寄件人信息</span><span className='redFont'>标题标*为必填项</span></div>
                        <div className='formContent'>
                            <div className='name mustOption'><label>姓名</label><input type="text" placeholder='请填写联系人姓名'
                                                                                     ref="senderName" required/></div>
                            <div className='company'><label>寄件公司</label><input type="text" placeholder='请填写公司名称'
                                                                               ref="senderCompany"/></div>
                            <div className='company'><label>固话</label><input type="text" placeholder=''
                                                                             ref="senderFixPhone"/></div>
                            <div className='tel mustOption'><label>手机</label><input type="text" placeholder='请填写手机号'
                                                                                    ref="senderTel" required/></div>
                            <div className='address mustOption'>
                                <label>地址</label>
                                <div className='adrInfo'>
                                    <input type="text" placeholder='请选择所在地区，例如：陕西省-西安市-莲湖区' ref="senderAddr"/>
                                    <input type="text" placeholder='请填写所在街道及详细地址' ref="senderAddrDetail"/>
                                </div>
                            </div>
                            <div className='thingsType mustOption'>
                                <label>托寄物类型</label>
                                <select ref="senderThingsType">
                                    <option value="文件">文件</option>
                                    <option value="日用品">日用品</option>
                                    <option value="食品">食品</option>
                                </select>
                            </div>
                            <div className='thingsWeight mustOption'>
                                <label>重量</label>
                                <input type='number' ref="senderWeight"/>
                            </div>

                        </div>
                    </div>
                    <div className='receiver'>
                        <div className='formTitle'><span>收件人信息</span></div>
                        <div className='formContent'>
                            <div className='name mustOption'><label>姓名</label><input type="text" placeholder='请填写联系人姓名'
                                                                                     ref="receiverName"/></div>
                            <div className='company '><label>收件公司</label><input type="text" placeholder='请填写公司名称'
                                                                                ref="receiverCompany"/></div>
                            <div className='company'><label>固话</label><input type="text" placeholder=''
                                                                             ref="receiverFixPhone"/></div>
                            <div className='tel mustOption'><label>手机</label><input type="text" ref="receiverTel"
                                                                                    placeholder='请填写手机号'/></div>
                            <div className='address mustOption'>
                                <label>地址</label>
                                <div className='adrInfo'>
                                    <input type="text" placeholder='请选择所在地区，例如：陕西省-西安市-莲湖区' ref="receiverAddr"/>
                                    <input type="text" placeholder='请填写所在街道及详细地址' ref="receiverAddrDetail"/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='submitOrder'>
                        <button className="submitBtn" onClick={this.onSubmitBtnClick.bind(this)}>下单</button>
                    </div>
                </div>
            </div>

        </div>
    }
}