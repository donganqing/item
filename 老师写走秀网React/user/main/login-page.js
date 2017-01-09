/**
 * Created by hasee on 2017/1/6.
 */
import {Header,Content} from  "../../common/components/common"
import  "../styles/login.css"
import React, {Component} from  "react"


class LoginList extends  Component {
    constructor(props){
        super(props)

        this.state={
            showPassword:false,
            remmeber:true,
            password:"222222",
            username:"lining"
        }
    }
    changeShowPassword () {
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    filterPassword(ev) {
        this.setState({
            password:ev.target.value.replace(/sb/g,"")
        });

    }
    filterUsername(ev) {

        this.setState({
            username:ev.target.value.replace(/m/g,"*")
        });
    }
    loginIn () {

        //登录
        console.log(this.state.username);
        console.log(this.state.password);
        window.localStorage.setItem("userID",this.state.username)
        window.location.hash ="#/user-center"

    }

    render () {
        // console.log(this.state.password);
        var passwordType = this.state.showPassword?"text":"password";
        return (
            <ul className="login-list">
                <li>
                    <input type="text"  value={this.state.username} onChange={(e)=>this.filterUsername(e)} className="text-bar" />
                </li>
                <li>
                    <input type={passwordType} onChange={(e)=>this.filterPassword(e)} className="text-bar" value={this.state.password}  />
                </li>
                <li>
                    <label>
                        <input type="checkbox" />
                        <span>记住密码</span>
                    </label>

                    <a className="go-forget">忘记密码？</a>
                </li>
                <li>
                    <label>
                        <input type="checkbox" onClick={(e)=>this.changeShowPassword(e)} />
                        <span>显示密码</span>
                    </label>
                </li>
                <li>
                    <button className="login-in" onClick={()=>this.loginIn()}>登录</button>
                </li>
                <li>
                    <a className="go-reg">注册</a>
                </li>

            </ul>
        )
    }
}

class LoginPage extends  Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <div className="page" id="login-page">
                <Header title="登录" />
                <Content hasFooter={false}>
                    <LoginList/>
                </Content>

            </div>
        )
    }
}

export  default  LoginPage