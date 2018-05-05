import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/poster.css');

export default class SenderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activityTab: 0,
            id: props.params.id,
            base: props.params.base
        }
    }

    onTabClick(e) {
        const target = e.target.innerText.split("")[0];
        let tab = 0;
        if (target === "未") {
            tab = 0;
        } else if (target === "已") {
            tab = 1;
        } else {
            tab = 2;
        }

        this.setState({
            activityTab: tab
        })


    }

    onLogOut(){
        browserHistory.push('/');

    }

    render() {
        let activityTab = this.state.activityTab;
        let containerStyle = ["contents notFinished", "contents finished", "contents personal"];
        let tabStyle = ["", "", ""];
        if(activityTab===0){
            containerStyle = ["contents notFinished", "js-hide", "js-hide"];
        }else if(activityTab===1){
            containerStyle = ["js-hide", "contents finished", "js-hide"];
        }else{
            containerStyle = ["js-hide", "js-hide", "contents personal"];
        }

        tabStyle[activityTab] = "activityTab";

        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{this.state.id}</span><span>(派送员)</span></span>
                    <span className="loginBtn" onClick={this.onLogOut.bind(this)}>登出</span>
                </nav>
                <section className="poster-main">
                    <div className="tab" onClick={this.onTabClick.bind(this)}>
                        <span className={tabStyle[0]}>未完成订单(3)</span>
                        <span className={tabStyle[1]}>已完成订单(1)</span>
                        <span className={tabStyle[2]}>个人中心</span>
                    </div>
                    <div className={containerStyle[0]}>
                        <div className="orderItem">
                            <div>订单号：1212211</div>
                            <div>
                                <span><label>收件人: </label><span>张小明1</span></span> |
                                <span><label>手机号:</label><span>13521212345</span></span> |
                                <span><label>地址:</label><span>北京市海淀区西小口东升科技园</span></span>
                            </div>
                            <div>
                                <span><label>寄件人: </label><span>王小明</span></span> |
                                <span><label>手机号: </label><span>13521212345</span></span> |
                                <span><label>地址: </label><span>西安邮电大学长安校区</span></span>
                            </div>
                            <div className="orderItemBtn">
                                <a href="#">查看地图</a>
                                <button className="notFinishBtn">待派送</button>
                            </div>
                        </div>

                    </div>
                    <div className={containerStyle[1]}>
                        <div className="orderItem">
                            <div>订单号：1212211</div>
                            <div>
                                <span><label>收件人: </label><span>张小明2</span></span> |
                                <span><label>手机号:</label><span>13521212345</span></span> |
                                <span><label>地址:</label><span>北京市海淀区西小口东升科技园</span></span>
                            </div>
                            <div>
                                <span><label>寄件人: </label><span>王小明</span></span> |
                                <span><label>手机号: </label><span>13521212345</span></span> |
                                <span><label>地址: </label><span>西安邮电大学长安校区</span></span>
                            </div>
                            <div className="orderItemBtn">
                                <a href="#">查看地图</a>
                                <button className="finishBtn">已签收</button>
                            </div>
                        </div>

                    </div>
                    <div className={containerStyle[2]}>
                       个人中心
                    </div>
                </section>

            </div>
        </div>
    }
}