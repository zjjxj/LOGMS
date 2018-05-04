import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/orderDetail.css');


export default class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          activityTab:0
        };
    }

    onTabClick(e){
        let target = e.target.innerText;

        if(target==="运单状态"){
            this.setState({
                activityTab:0
            })
        }else{
            this.setState({
                activityTab:1
            })
        }
    }

    render() {
        let tabStyle = ["",""];
        let contentStyle = ["orderDetailContent","orderDetailInfo js-hide"];
        let activityTab = this.state.activityTab;
        tabStyle[activityTab] = "activityOrderDetail";

        if(activityTab===0){
            contentStyle=["orderDetailContent","orderDetailInfo js-hide"];
        }else{
            contentStyle=["orderDetailContent js-hide","orderDetailInfo"];

        }

        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                </nav>
                <div className="orderDetail">
                    <div className="orderDetailTitle">
                        <div className="orderInfo">
                            <span>北京--->西安</span>
                            <span>订单号：1</span>
                        </div>

                        <span>已签收</span>
                    </div>
                    <div className="orderDetailTab" onClick={this.onTabClick.bind(this)}>
                        <span className={tabStyle[0]}>运单状态</span>
                        <span className={tabStyle[1]}>运单详情</span>
                    </div>
                    <div className={contentStyle[0]}>
                        <div className="orderNode">
                            <div className="nodeTitle">
                                2018-01-02
                            </div>
                            <div className="nodeContent">
                                <div>
                                    <span>11:45:05</span>
                                    <span>已签收  本人签收</span>
                                </div>
                                <div>
                                    <span>05:45:05</span>
                                    <span>派送中  派送员:小明</span>
                                </div>
                                <div>
                                    <span>04:03:05</span>
                                    <span>快件到达B转运站</span>
                                </div>
                                <div>
                                    <span>00:45:05</span>
                                    <span>快件到达A转运站</span>
                                </div>
                            </div>
                        </div>
                        <div className="orderNode">
                            <div className="nodeTitle">
                                2018-01-01
                            </div>
                            <div className="nodeContent">
                                <div>
                                    <span>11:45:05</span>
                                    <span>已签收  本人签收</span>
                                </div>
                                <div>
                                    <span>05:45:05</span>
                                    <span>派送中  派送员:小明</span>
                                </div>
                                <div>
                                    <span>04:03:05</span>
                                    <span>快件到达B转运站</span>
                                </div>
                                <div>
                                    <span>00:45:05</span>
                                    <span>已揽件</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={contentStyle[1]}>
                         <div className="orderDetailInfoTest">
                             <label>请输入手机号进行验证</label>
                             <input type="text" placeholder="请输入手机号"/>
                             <button>发送</button>
                             <input type='text' placeholder="请输入验证码"/>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    }
}