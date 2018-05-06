import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/orderDetail.css');


export default class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTab: 0,
            id: props.params.id,
            orderInfo: {
                _id: "121212",
                senderInfo: {
                    "name": "",
                    "company": "西瓜公司",
                    "fixPhone": "88888888",
                    "tel": "15633333333",
                    "addr": "",
                    "addrDetail": "子午大道",
                    "thingsType": "文件",
                    "weight": "3"
                },
                receiverInfo: {
                    "name": "zhoujie2",
                    "company": "西瓜公司2",
                    "fixPhone": "888888882",
                    "tel": "156333333332",
                    "addr": "陕西省西安市长安区2",
                    "addrDetail": "子午大道2"
                },
                orderStatus: [
                    {
                        "date": "2018-01-01",
                        "state": [
                            {
                                "time": "01:45:45",
                                "state": "已揽件",
                                "remark": ""
                            },
                            {
                                "time": "02:45:45",
                                "state": "运输中",
                                "remark": "快件到达B转运站"
                            }
                        ]
                    }
                    , {
                        "date": "2018-01-02",
                        "state": [
                            {
                                "time": "01:45:45",
                                "state": "运输中",
                                "remark": "快件到达c转运站"
                            },
                            {
                                "time": "02:45:45",
                                "state": "派送中",
                                "remark": "派送员：张晓某 13667023399"
                            },
                            {
                                "time": "04:45:45",
                                "state": "已签收",
                                "remark": "本人签收"
                            }

                        ]
                    }
                ]
            }
        };
    }

    componentDidMount() {
        fetch(`/findOrderById?id=${this.state.id}`,
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    orderInfo: myJson[0]
                });
            });
    }

    onTabClick(e) {
        let target = e.target.innerText;

        if (target === "运单状态") {
            this.setState({
                activityTab: 0
            })
        } else {
            this.setState({
                activityTab: 1
            })
        }
    }

    render() {
        let tabStyle = ["", ""];
        let contentStyle = ["orderDetailContent", "orderDetailInfo js-hide"];
        let activityTab = this.state.activityTab;
        let orderInfo = this.state.orderInfo;
        tabStyle[activityTab] = "activityOrderDetail";

        if (activityTab === 0) {
            contentStyle = ["orderDetailContent", "orderDetailInfo js-hide"];
        } else {
            contentStyle = ["orderDetailContent js-hide", "orderDetailInfo"];

        }

        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                </nav>
                <div className="orderDetail">
                    <div className="orderDetailTitle">
                        <div className="orderInfo">
                            <span>{orderInfo.senderInfo.addr}--->{orderInfo.receiverInfo.addr}</span>
                            <span>订单号：{orderInfo._id}</span>
                        </div>

                        <span>{orderInfo.orderStatus[0].state[0].state}</span>
                    </div>
                    <div className="orderDetailTab" onClick={this.onTabClick.bind(this)}>
                        <span className={tabStyle[0]}>运单状态</span>
                        <span className={tabStyle[1]}>运单详情</span>
                    </div>
                    <div className={contentStyle[0]}>
                        {this.state.orderInfo.orderStatus.map((item,index)=>{
                            return  <div className="orderNode" key={index}>

                                <div className="nodeTitle">
                                    {item.date}
                                </div>
                                <div className="nodeContent">
                                    {item.state.map((value,i)=>{
                                        return <div key={i}>
                                            <span>{value.time} </span>
                                            <span>{value.state} {value.remark}</span>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}

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