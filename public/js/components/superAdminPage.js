import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/superAdminPage.css');


export default class SuperAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityTab: 0,
            userArr: [],
            id: props.params.id,
            orderArr: []
        }


    }

    componentDidMount() {
        fetch('/getAllUser',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    userArr: myJson
                });
            });

        fetch('/getAllOrder',
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    orderArr: myJson
                });
            });
    }

    onfindUserBtn(e) {
        e.preventDefault();
        const id = this.refs.idInput.value;
        fetch(`/findUserById?id=${id}`,
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.length) {
                    this.setState({
                        userArr: myJson
                    });
                } else {
                    return false;
                }

            });

    }

    onTabClick(e) {
        const target = e.target.innerText;
        let tab = 0;
        if (target === "人员管理") {
            tab = 0;
        } else if (target === "人员注册") {
            tab = 1;

        } else if (target === "订单统计") {
            tab = 2;
        }

        this.setState({
            activityTab: tab
        })
    }

    onSignInClick() {
        const name = this.refs.nameInput.value;
        const tel = this.refs.telInput.value;
        const password = this.refs.passwordInput.value;
        const idCard = this.refs.idCardInput.value;
        const addr = this.refs.addrInput.value;
        const sex = this.refs.sexInput.value;
        const birth = this.refs.birthInput.value;
        const post = this.refs.postInput.value;
        const base = this.refs.baseInput.value;
        const _id = this.refs._id.value;

        const info = {name, tel, password, idCard, addr, sex, birth, post,base,_id};

        fetch('/addUser',
            {
                method: 'POST',
                body: JSON.stringify(info),
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson)=> {
                if (myJson.ret) {
                    alert("注册成功！")
                    let newArr = Object.assign([],this.state.userArr);
                    newArr.push(myJson.data)
                    this.setState({
                        userArr: newArr,

                    });
                } else {
                    alert("注册失败！")
                }
            });
    }

    onLogoutBtn() {
        browserHistory.push('/');
    }

    deleteUser(e){
        e.preventDefault();

        let id=e.target.dataset.id;
        let index=e.target.dataset.i;

        fetch(`/deleteUser?id=${id}`,
            {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'})
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson)=> {
                if (myJson.ret) {
                    // alert("删除成功！")
                    let newArr = Object.assign([],this.state.userArr);
                    console.log(newArr,index)
                    newArr.splice(index,1);
                    this.setState({
                        userArr: newArr,
                    });
                } else {
                    // alert("删除失败！")
                    console.log("删除失败")
                }
            });

    }

    searchOrder(e) {
        e.preventDefault();
        fetch(`/findOrderById?id=${this.refs.orderNumInput.value}`,
            {
                method: 'GET'
            })
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                if (myJson.length) {
                    this.setState({
                        orderArr: myJson
                    })
                } else {
                    return false;
                }
            });
    }

    render() {
        const {userArr, activityTab, id, orderArr} = this.state;
        const newUserId =userArr[userArr.length-1] && userArr[userArr.length-1]._id;
        let containerStyle = ["contents userManager", "contents userSignIn js-hide", "contents orderManager js-hide"];
        let tabHtml;
        if (activityTab === 0) {
            containerStyle = ["contents userManager", "js-hide", "js-hide"];
            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span className="activityTab">人员管理</span>
                <span>人员注册</span>
                <span>订单统计</span>
            </div>
        } else if (activityTab === 1) {
            containerStyle = ["js-hide", "contents userSignIn", "js-hide"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>人员管理</span>
                <span className="activityTab">人员注册</span>
                <span>订单统计</span>
            </div>
        } else {
            containerStyle = ["js-hide", "js-hide", "contents orderManager"];

            tabHtml = <div className="tab" onClick={this.onTabClick.bind(this)}>
                <span>人员管理</span>
                <span>人员注册</span>
                <span className="activityTab">订单统计</span>
            </div>
        };


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span>{id}</span><span>(系统管理员)</span></span>
                    <span className="logoutBtn" onClick={this.onLogoutBtn.bind(this)}>登出</span>
                </nav>
                <section className="superAdmin-main">
                    {tabHtml}
                    <div className={containerStyle[0]}>
                        <form className="userSearch">
                            <input type="text" placeholder="请输入员工号" ref='idInput'/>
                            <button onClick={this.onfindUserBtn.bind(this)}>查询</button>
                        </form>
                        <div className="userList">
                            <div className="list-title">
                                <span>工号</span>
                                <span>姓名</span>
                                <span>性别</span>
                                <span>工作地点</span>
                                <span>岗位</span>
                                <span>详细信息</span>
                                <span>删除</span>
                            </div>
                            {userArr.map((item, index) => {
                                return <div className="list-item" key={index}>
                                    <span>{item._id}</span>
                                    <span>{item.name}</span>
                                    <span>{item.sex}</span>
                                    <span>{item.base}</span>
                                    <span>{item.post}</span>
                                    <span><a href="#">个人信息</a></span>
                                    <span><button className="deleteUserBtn" data-id={item._id} data-i={index} onClick={this.deleteUser.bind(this)}>删除</button></span>
                                </div>
                            })}

                        </div>
                    </div>
                    <div className={containerStyle[1]}>
                        <div>
                            <label>工号</label>
                            <div className="contents">
                                <input type="text" ref="_id" value={parseInt(newUserId,10)+1} disabled className = "disableInput"/>
                            </div>
                        </div>
                        <div>
                            <label>姓名</label>
                            <div className="contents">
                                <input type="text" ref="nameInput"/>
                            </div>
                        </div>
                        <div>
                            <label>密码</label>
                            <div className="contents">
                                <input type="password" ref='passwordInput'/>
                            </div>
                        </div>
                        <div>
                            <label>性别</label>
                            <div className="contents">
                                <select ref="sexInput">
                                    <option>男</option>
                                    <option>女</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>出生日期</label>
                            <div className="contents"><input type="date" ref='birthInput'/></div>
                        </div>
                        <div>
                            <label>身份证号</label>
                            <div className="contents"><input type="text" ref="idCardInput"/></div>
                        </div>
                        <div>
                            <label>手机号</label>
                            <div className="contents"><input type="text" ref='telInput'/></div>
                        </div>
                        <div>
                            <label>住址</label>
                            <div className="contents"><input type="text" ref='addrInput'/></div>
                        </div>
                        <div>
                            <label>岗位</label>
                            <div className="contents">
                                <select ref='postInput'>
                                    <option>派送员</option>
                                    <option>揽件员</option>
                                    <option>站点管理员</option>
                                    <option>站点扫描员</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label>工作地点</label>
                            <div className="contents">
                                <select ref='baseInput'>
                                    <option>A站点</option>
                                    <option>B站点</option>
                                    <option>C站点</option>
                                    <option>D站点</option>
                                </select>
                            </div>
                        </div>
                        <button className="signInBtn" onClick={this.onSignInClick.bind(this)}>注册</button>
                    </div>
                    <div className={containerStyle[2]}>
                        <form className="orderSearch">
                            <input type="text" placeholder="请输入订单号" ref="orderNumInput"/>
                            <button onClick={this.searchOrder.bind(this)}>查询</button>
                        </form>
                        <div className="orderList">
                            <div className="list-title">
                                <span>订单号</span>
                                <span>订单状态</span>
                                <span>订单详情</span>

                            </div>
                            {orderArr.map((item,i) => {
                                let url = `/orderDetail/${item._id}`;
                                return <div className="list-item" key={i}>
                                    <span>{item._id}</span>
                                    <span>{item.orderStatus[0].state[0].state}</span>
                                    <span><a href={url}>订单详情</a></span>
                                </div>
                            })}
                        </div>
                    </div>
                </section>

            </div>
        </div>

    }
}