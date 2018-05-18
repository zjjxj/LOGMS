import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/poster.css');

export default class SenderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activityTab: 0,
            id: props.params.id,
            base: props.params.base,
            finishedOrder: [],
            unFinishedOrder: []
        }
    }

    componentDidMount() {
        //待派送订单条件：最后一次扫描派送员是自己+状态为派送中  已派送条件：最后状态为已签收+派送员是自己
        fetch('/getAllOrder',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                let orderArr = myJson.filter((item) => {
                    return (item.orderStatus[0].state[0].dealPersonId === this.state.id) && (item.orderStatus[0].state[0].state === "派送中");
                });
                let finishArr = myJson.filter((item) => {
                    return item.orderStatus[0].state[0].dealPersonId === this.state.id && item.orderStatus[0].state[0].state === "已签收";
                });
                this.setState({
                    finishedOrder: finishArr,
                    unFinishedOrder: orderArr
                });
            });
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

    postUpdateInfo(id, infoObj) {
        fetch('/updateOrder',
            {
                method: 'POST',
                body: JSON.stringify({id, infoObj}),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.ret) {
                    let orderList = this.state.unFinishedOrder;
                    let finishOrder = this.state.finishedOrder;
                    let copyOrderList = Object.assign([], orderList);
                    let copyFinishOrder = Object.assign([], finishOrder);
                    let index = 0;
                    let deleteOrder = copyOrderList.find((item, i) => {
                        if (item._id === id) {
                            index = i;
                            return true;
                        }

                    });
                    copyFinishOrder.push(deleteOrder);
                    copyOrderList.splice(index, 1);
                    this.setState({
                        unFinishedOrder: copyOrderList,
                        finishedOrder: copyFinishOrder
                    });
                    alert("更新成功！")
                } else {
                    alert("更新失败！")
                }
            });

    }

    onUpdateOrderBtn(e){
        //后台更新状态  前端更新展示
        const base = this.state.base;
        const id = this.state.id;
        let infoObj = this.state.unFinishedOrder[e.target.dataset.index];

        let remark = `本人签收`;
        let myDate = new Date();
        let date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`;
        let time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;

        let t = infoObj.orderStatus.find((item) => {
            if (item.date === date) {
                item.state.unshift({
                    time: time, state: "已签收", remark: remark, personBase: base,
                    dealPersonId: id
                });
                return true;
            }
        });
        if (!t) {
            infoObj.orderStatus.unshift({
                date: date, state: [{
                    time: time, state: "已签收", remark: remark, personBase: base,
                    dealPersonId: id
                }]
            })
        }

        this.postUpdateInfo(e.target.dataset.id, infoObj)
    }

    onLogOut() {
        browserHistory.push('/');

    }

    render() {
        let activityTab = this.state.activityTab;
        let containerStyle = ["contents notFinished", "contents finished", "contents personal"];
        let tabStyle = ["", "", ""];
        if (activityTab === 0) {
            containerStyle = ["contents notFinished", "js-hide", "js-hide"];
        } else if (activityTab === 1) {
            containerStyle = ["js-hide", "contents finished", "js-hide"];
        } else {
            containerStyle = ["js-hide", "js-hide", "contents personal"];
        }

        tabStyle[activityTab] = "activityTab";


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{this.state.id}</span><span>(派送员/{this.state.base})</span></span>
                    <span className="loginBtn" onClick={this.onLogOut.bind(this)}>登出</span>
                </nav>
                <section className="poster-main">
                    <div className="tab" onClick={this.onTabClick.bind(this)}>
                        <span className={tabStyle[0]}>未完成订单({this.state.unFinishedOrder.length})</span>
                        <span className={tabStyle[1]}>已完成订单({this.state.finishedOrder.length})</span>
                        {/*<span className={tabStyle[2]}>个人中心</span>*/}
                    </div>
                    <div className={containerStyle[0]}>
                        {this.state.unFinishedOrder.map((item,i) => {
                            return <div className="orderItem" key={i}>
                                <div>订单号：{item._id}</div>
                                <div>
                                    <span><label> 收件人: </label><span>{item.senderInfo.name} </span></span> |
                                    <span><label> 手机号: </label><span>{item.senderInfo.tel} </span></span> |
                                    <span><label> 地址: </label><span>{item.senderInfo.addr} </span></span>
                                </div>
                                <div>
                                    <span><label> 寄件人: </label><span> {item.receiverInfo.name} </span></span> |
                                    <span><label> 手机号: </label><span> {item.receiverInfo.tel} </span></span> |
                                    <span><label> 地址: </label><span> {item.receiverInfo.addr} </span></span>
                                </div>
                                <div className="orderItemBtn">
                                    <a href="//map.baidu.com/">查看地图</a>
                                    <button data-id={item._id} data-index={i} className="notFinishBtn" onClick={this.onUpdateOrderBtn.bind(this)}>待派送</button>
                                </div>
                            </div>
                        })}


                    </div>
                    <div className={containerStyle[1]}>
                        {this.state.finishedOrder.map((item,i) => {
                            return <div className="orderItem" key={i}>
                                <div>订单号：{item._id}</div>
                                <div>
                                    <span><label> 收件人: </label><span>{item.senderInfo.name} </span></span> |
                                    <span><label> 手机号: </label><span>{item.senderInfo.tel} </span></span> |
                                    <span><label> 地址: </label><span>{item.senderInfo.addr} </span></span>
                                </div>
                                <div>
                                    <span><label> 寄件人: </label><span> {item.receiverInfo.name} </span></span> |
                                    <span><label> 手机号: </label><span> {item.receiverInfo.tel} </span></span> |
                                    <span><label> 地址: </label><span> {item.receiverInfo.addr} </span></span>
                                </div>
                                <div className="orderItemBtn">
                                    <span>备注：{item.orderStatus[0].state[0].remark}</span>
                                    <button className="finishBtn">已签收</button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={containerStyle[2]}>
                        个人中心
                    </div>
                </section>

            </div>
        </div>
    }
}