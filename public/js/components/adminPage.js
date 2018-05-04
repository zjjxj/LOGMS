import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/adminPage.css');


export default class SuperAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTab: 0
        }

    }

    onTabClick(e) {
        const target = e.target.innerText;
        let tab = 0;
        if (target === "待分配订单") {
            tab = 0;
        } else if (target === "已分配订单") {
            tab = 1;

        } else if (target === "站点派送员") {
            tab = 2;
        }

        this.setState({
            activityTab: tab
        })
    }

    onLogoutBtn(){
        browserHistory.push('/');
    }

    render() {
        const activityTab = this.state.activityTab;
        let containerStyle = ["content userManager","content userSignIn js-hide","content orderManager js-hide"];
        let tabHtml;
        if (activityTab === 0) {
            containerStyle=["content userManager","js-hide","js-hide"];
            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span className="activityTab">待分配订单</span>
                <span>已分配订单</span>
                <span >站点派送员</span>
            </div>
        } else if (activityTab === 1) {
            containerStyle=["js-hide","content userSignIn","js-hide"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>待分配订单</span>
                <span className="activityTab">已分配订单</span>
                <span >站点派送员</span>
            </div>
        } else {
            containerStyle=["js-hide","js-hide","content orderManager"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>待分配订单</span>
                <span>已分配订单</span>
                <span className="activityTab">站点派送员</span>
            </div>
        };





        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span> 0144378</span><span>(站点管理员)</span></span>
                    <span className="logoutBtn" onClick={this.onLogoutBtn.bind(this)}>登出</span>
                </nav>
                <section className="superAdmin-main">
                    {tabHtml}
                    <div className={containerStyle[0]}>
                        <form className="userSearch">
                            <input type="text" placeholder="请输入员工号"/>
                            <button>查询</button>
                        </form>
                        <div className="userList">
                            <div className="list-title">
                                <span>工号</span>
                                <span>姓名</span>
                                <span>性别</span>
                                <span>年龄</span>
                                <span>岗位</span>
                                <span>详细信息</span>
                            </div>
                            <div className="list-item">
                                <span>00006</span>
                                <span>小明5</span>
                                <span>男</span>
                                <span>21</span>
                                <span>派送员</span>
                                <span><a href="#">个人信息</a></span>
                            </div>

                        </div>
                    </div>
                    <div className={containerStyle[1]}>
                        <div>
                            <label>姓名</label>
                            <div className="contents">
                                <input type="text"/>
                            </div>
                        </div>
                        <div>
                            <label>密码</label>
                            <div className="contents">
                                <input type="password"/>
                            </div>
                        </div>
                        <div>
                            <label>性别</label>
                            <div className="contents">
                                <select>
                                    <option>男</option>
                                    <option>女</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>出生日期</label>
                            <div className="contents"><input type="date"/></div>
                        </div>
                        <div>
                            <label>身份证号</label>
                            <div className="contents"><input type="text"/></div>
                        </div>
                        <div>
                            <label>手机号</label>
                            <div className="contents"><input type="text"/></div>
                        </div>
                        <div>
                            <label>住址</label>
                            <div className="contents"><input type="text"/></div>
                        </div>
                        <div>
                            <label>岗位</label>
                            <div className="contents">
                                <select>
                                    <option>派送员</option>
                                    <option>揽件员</option>
                                    <option>站点管理员</option>
                                    <option>站点扫描员</option>
                                </select>
                            </div>
                        </div>
                        <button className="signInBtn">注册</button>
                    </div>
                    <div className={containerStyle[2]}>
                        <form className="orderSearch">
                            <input type="text" placeholder="请输入订单号"/>
                            <button>查询</button>
                        </form>
                        <div className="orderList">
                            <div className="list-title">
                                <span>订单号</span>
                                <span>订单状态</span>
                                <span>订单详情</span>

                            </div>
                            <div className="list-item">
                                <span>1</span>
                                <span>已签收</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>2</span>
                                <span>待揽件</span>
                                <span><a href="#">订单详情</a></span>

                            </div>
                            <div className="list-item">
                                <span>3</span>
                                <span>已揽件</span>
                                <span><a href="#">订单详情</a></span>

                            </div>
                            <div className="list-item">
                                <span>4</span>
                                <span>运输中</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>5</span>
                                <span>带投递</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>6</span>
                                <span>运输中</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>7</span>
                                <span>待揽件</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>8</span>
                                <span>已签收</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>9</span>
                                <span>待投递</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>10</span>
                                <span>已签收</span>
                                <span><a href="#">订单详情</a></span>
                            </div>
                            <div className="list-item">
                                <span>11</span>
                                <span>已签收</span>
                                <span><a href="#">订单详情</a></span>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </div>

    }
}