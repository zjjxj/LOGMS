import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/adminPage.css');


export default class SuperAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTab: 0,
            orderList: [{_id: 111}, {_id: 111}],
            deliverList: [{}],
            id: props.params.id,
            base: props.params.base,
            finishOrder: []
        }

    }

    componentDidMount() {
        //待分配订单条件：最后一次扫描base相同  已分配条件：最后状态为派送中且base相同
        fetch('/getAllOrder',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                let orderArr = myJson.filter((item) => {
                    return (item.orderStatus[0].state[0].personBase === this.state.base) && (item.orderStatus[0].state[0].state === "运输中");
                });
                let finishArr = myJson.filter((item) => {
                    return item.orderStatus[0].state[0].personBase === this.state.base && item.orderStatus[0].state[0].state !== "运输中";
                });
                this.setState({
                    orderList:orderArr,
                    finishOrder: finishArr
                });
            });

        //post为派送员且base相同
        fetch('/getAllUser',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                let result = myJson.filter((item) => {
                    return item.base === this.state.base && item.post === "派送员";
                });

                this.setState({
                    deliverList: result
                });
            });

    }

    onTabClick(e) {
        const target = e.target.innerText.split("")[0];
        let tab = 0;
        if (target === "待") {
            tab = 0;
        } else if (target === "已") {
            tab = 1;

        } else if (target === "站") {
            tab = 2;
        }

        this.setState({
            activityTab: tab
        })
    }

    onLogoutBtn() {
        browserHistory.push('/');
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
                    //
                    let orderList = this.state.orderList;
                    let finishOrder = this.state.finishOrder;
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
                        orderList: copyOrderList,
                        finishOrder: copyFinishOrder
                    });
                    alert("更新成功！")
                } else {
                    alert("更新失败！")
                }
            });

    }

    onUpdateOrderBtn(e) {
        let base = this.state.base;
        let deliverId = this.refs[e.target.dataset.id].value.split("-")[1];
        let deliverName = this.refs[e.target.dataset.id].value.split("-")[0];
        let deliverTel = this.refs[e.target.dataset.id].value.split("-")[2];
        let infoObj = this.state.orderList[e.target.dataset.index];
        let remark = `派送员:${deliverName}  ${deliverTel}`;
        let myDate = new Date();
        let date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`;
        let time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
        let t = infoObj.orderStatus.find((item) => {
            if (item.date === date) {
                item.state.unshift({
                    time: time, state: "派送中", remark: remark, personBase: base,
                    dealPersonId: deliverId
                });
                return true;
            }
        });
        if (!t) {
            infoObj.orderStatus.unshift({
                date: date, state: [{
                    time: time, state: "派送中", remark: remark, personBase: base,
                    dealPersonId: deliverId
                }]
            })
        }
        this.postUpdateInfo(e.target.dataset.id, infoObj)
    }

    render() {
        const activityTab = this.state.activityTab;
        let containerStyle = ["contents userManager", "contents userManager js-hide", "contents orderManager js-hide"];
        let orderList = this.state.orderList;
        let deliverList = this.state.deliverList;
        let finishOrder = this.state.finishOrder;
        let tabHtml;
        if (activityTab === 0) {
            containerStyle = ["contents userManager", "js-hide", "js-hide"];
            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span className="activityTab">待分配订单({orderList.length})</span>
                <span>已分配订单({finishOrder.length})</span>
                <span>站点派送员</span>
            </div>
        } else if (activityTab === 1) {
            containerStyle = ["js-hide", "contents userManager", "js-hide"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>待分配订单({orderList.length})</span>
                <span className="activityTab">已分配订单({finishOrder.length})</span>
                <span>站点派送员</span>
            </div>
        } else {
            containerStyle = ["js-hide", "js-hide", "contents orderManager"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>待分配订单({orderList.length})</span>
                <span>已分配订单({finishOrder.length})</span>
                <span className="activityTab">站点派送员</span>
            </div>
        }
        ;


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{this.state.id}</span><span>(站点管理员/{this.state.base})</span></span>
                    <span className="logoutBtn" onClick={this.onLogoutBtn.bind(this)}>登出</span>
                </nav>
                <section className="superAdmin-main">
                    {tabHtml}
                    <div className={containerStyle[0]}>
                        {orderList.map((item, i) => {
                            return <div className="adminPageOrderItem" key={i}>
                                <div className="admin-orderId">订单号: {item._id}</div>
                                <div className="adminPage-orderItem-bottom">
                                    <div className="admin-orderDelivery">
                                        派送员: <select data-id={item._id} ref={item._id}>
                                        {deliverList.map((items, index) => {
                                            return <option key={index}>{items.name}-{items._id}-{items.tel}</option>
                                        })}
                                    </select>
                                    </div>
                                    <button className="updateOrderBtn" onClick={this.onUpdateOrderBtn.bind(this)}
                                            data-id={item._id} data-index={i}>确认分配
                                    </button>
                                </div>

                            </div>
                        })}
                    </div>
                    <div className={containerStyle[1]}>
                        {finishOrder.map((item, i) => {
                            return <div className="adminPageOrderItem" key={i}>
                                <div className="admin-orderId">订单号: {item._id}</div>
                                <div className="adminPage-orderItem-bottom">
                                    <div className="admin-orderDelivery">
                                        派送员:{item.orderStatus[0].state[0].dealPersonId}
                                    </div>
                                    <button className="finishOrderBtn" data-id={item._id} data-index={i}>{item.orderStatus[0].state[0].state}
                                    </button>
                                </div>

                            </div>
                        })}

                    </div>
                    <div className={containerStyle[2]}>
                        <div className="orderList">
                            <div className="list-title">
                                <span>工号</span>
                                <span>姓名</span>
                                <span>手机号</span>

                            </div>
                            {this.state.deliverList.map((item,i) => {
                                return <div className="list-item" key={i}>
                                    <span>{item._id}</span>
                                    <span>{item.name}</span>
                                    <span>{item.tel}</span>
                                </div>
                            })}

                        </div>
                    </div>
                </section>

            </div>
        </div>

    }
}