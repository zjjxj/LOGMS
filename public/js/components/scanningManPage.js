import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/scanningManPage.css');

export default class ScanningPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activityTab: 0,
            id: props.params.id,
            base: props.params.base,
            upDateInfo: `快件到达${props.params.base}`
        }
    }

    onTabClick(e) {
        const target = e.target.innerText;
        let tab = 0;
        if (target === "货物状态更新") {
            tab = 0;
        } else if (target === "站点信息") {
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
            .then(function (myJson) {
                if (myJson.ret) {
                    alert("更新成功！")
                } else {
                    alert("更新失败！")
                }
            });

    }

    updateOrder() {
        const orderId = this.refs.orderNumber.value;
        const remark = this.refs.updateInfo.value;
        const {base,id} = this.state;

        fetch(`/findOrderById?id=${orderId}`,
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.length) {
                    let myDate = new Date();
                    let info = myJson[0];
                    if(info.orderStatus[0].state[0].dealPersonId===this.state.id){
                        alert("快件已扫描！")
                    }else if(info.orderStatus[0].state[0].state==="派送中"||info.orderStatus[0].state[0].state==="已签收"){
                        alert("订单状态为派送中或已签收，不可扫描！")
                    }else{
                        let date = `${myDate.getFullYear()}-${myDate.getMonth()}-${myDate.getDate()}`;
                        let time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
                        let t = info.orderStatus.find((item) => {
                            if (item.date === date) {
                                item.state.unshift({
                                    time: time,
                                    state: "运输中",
                                    remark: remark,
                                    personBase: base,
                                    dealPersonId: id
                                });
                                return true;
                            }
                        });
                        if (!t) {

                            info.orderStatus.unshift({
                                date: date,
                                state: [{
                                    time: time,
                                    state: "运输中",
                                    remark: remark,
                                    personBase:base,
                                    dealPersonId: id
                                }]
                            })
                        }
                        this.postUpdateInfo(orderId, myJson[0]);
                    }

                } else {
                    alert("订单不存在！")
                }
            });
    }

    onInputChange(e) {
        this.setState({
            upDateInfo: e.target.value
        })
    }

    onLogOut() {
        browserHistory.push('/');

    }

    render() {
        let activityTab = this.state.activityTab;
        let containerStyle = ["scanningInfo", "stationInfo"];
        let tabStyle = ["", "", ""];

        if (activityTab === 0) {
            containerStyle = ["scanningInfo", "js-hide"];
        } else {
            containerStyle = ["js-hide", "stationInfo"];

        }

        tabStyle[activityTab] = "activityTab";


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{this.state.id}</span><span>（站点扫描员/{this.state.base})</span></span>
                    <span className="loginBtn" onClick={this.onLogOut.bind(this)}>登出</span>
                </nav>
                <section className="poster-main">
                    <div className="tab" onClick={this.onTabClick.bind(this)}>
                        <span className={tabStyle[0]}>货物状态更新</span>
                        <span className={tabStyle[1]}>站点信息</span>
                    </div>
                    <div className="contents">
                        <div className={containerStyle[0]}>
                            <div>
                                <label>请输入运单号</label>
                                <input type="text" ref="orderNumber"/>

                            </div>
                            <div>
                                <label>更新信息</label>
                                <input type="text" ref="updateInfo" value={this.state.upDateInfo}
                                       onChange={this.onInputChange.bind(this)}/>
                            </div>
                            <button onClick={this.updateOrder.bind(this)}>更新</button>
                        </div>
                        <div className={containerStyle[1]}>
                            站点名称：<span>{this.state.base}</span>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    }
}