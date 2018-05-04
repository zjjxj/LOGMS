import React from 'react';
import {browserHistory} from 'react-router';

require('../../css/scanningManPage.css');

export default class ScanningPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activityTab: 0
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

    render() {
        let activityTab = this.state.activityTab;
        let containerStyle = ["scanningInfo", "stationInfo"];
        let tabStyle = ["", "", ""];

        if(activityTab===0){
            containerStyle=["scanningInfo","js-hide"];
        }else{
            containerStyle=["js-hide", "stationInfo"];

        }

        tabStyle[activityTab] = "activityTab";


        return <div className="content">
            <div className='page'>
                <nav className='head'>
                    <p className="navbar-text">LOG物流管理系统</p>
                    <span>欢迎你~~ <span> 011111</span><span>（站点扫描员)</span></span>
                    <span className="loginBtn">登出</span>
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
                               <input type="text"/>

                           </div>
                           <div>
                               <label>更新信息</label>
                               <input type="text"/>
                           </div>
                           <button>更新</button>
                       </div>
                        <div className={containerStyle[1]}>
                            站点名称：<span>A转运站</span>
                        </div>
                    </div>

                </section>

            </div>
        </div>
    }
}