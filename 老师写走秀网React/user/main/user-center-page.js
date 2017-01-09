/**
 * Created by hasee on 2017/1/6.
 */

import {Header,Content,Footer} from  "../../common/components/common"
import  "../styles/user-center.css"
import React, {Component} from  "react"


class UserCenterPage extends  Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className="page" id="user-center-page">
                <Header title="个人中心" hasBack={false} />
                <Content hasFooter={true}>
                    <ul className="center-list">
                        <li><a  className="arrow-item" href="#/order-list">我的订单</a></li>
                        <li ><a  className="arrow-item" href="#/footmark">我的足迹</a></li>
                        <li ><a  className="arrow-item" href="#/order-list">我的订单</a></li>
                        <li ><a  className="arrow-item" href="#/order-list">我的订单</a></li>
                    </ul>
                </Content>
                <Footer active={3} />

            </div>
        )
    }
}

export  default UserCenterPage