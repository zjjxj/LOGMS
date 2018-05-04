import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/deliveryPage.css');


export default class DeliveryPage extends React.Component {

    render() {
        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span> 0144378</span><span>(揽件员)</span></span>
                    <span className="logoutBtn">登出</span>
                </nav>
                <div className="deliverMain">
                    <div className='sender'>
                        <div className='formTitle'><span>寄件人信息</span><span className='redFont'>标题标*为必填项</span></div>
                        <div className='formContent'>
                            <div className='name mustOption'><label>姓名</label><input type="text" placeholder='请填写联系人姓名'/></div>
                            <div className='company'><label>寄件公司</label><input type="text" placeholder='请填写公司名称'/></div>
                            <div className='company'><label>固话</label><input type="text" placeholder=''/></div>
                            <div className='tel mustOption'><label>手机</label><input type="text" placeholder='请填写手机号'/></div>
                            <div className='address mustOption'>
                                <label>地址</label>
                                <div className='adrInfo'>
                                    <input type="text" placeholder='请选择所在地区，例如：陕西省-西安市-莲湖区'/>
                                    <input type="text" placeholder='请填写所在街道及详细地址'/>
                                </div>
                            </div>
                            <div className='thingsType mustOption'>
                                <label>托寄物类型</label>
                                <select>
                                    <option value ="volvo">文件</option>
                                    <option value ="saab">日用品</option>
                                    <option value="opel">食品</option>
                                </select>
                            </div>
                            <div className='thingsWeight mustOption'>
                                <label>重量</label>
                                <input type='number'/>
                            </div>

                        </div>
                    </div>
                    <div className='receiver'>
                        <div className='formTitle'><span>收件人信息</span></div>
                        <div className='formContent'>
                            <div className='name mustOption'><label>姓名</label><input type="text" placeholder='请填写联系人姓名'/></div>
                            <div className='company '><label>收件公司</label><input type="text" placeholder='请填写公司名称'/></div>
                            <div className='company'><label>固话</label><input type="text" placeholder=''/></div>
                            <div className='tel mustOption'><label>手机</label><input type="text" placeholder='请填写手机号'/></div>
                            <div className='address mustOption'>
                                <label>地址</label>
                                <div className='adrInfo'>
                                    <input type="text" placeholder='请选择所在地区，例如：陕西省-西安市-莲湖区'/>
                                    <input type="text" placeholder='请填写所在街道及详细地址'/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='submitOrder'>
                        <button className="submitBtn">下单</button>
                    </div>
                </div>
            </div>

        </div>
    }
}