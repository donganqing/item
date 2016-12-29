/**
 * Created by hasee on 2016/12/28.
 */

var Header = React.createClass({
    render:function () {
        return (

            <div>
                <ul className="header">
                    <li className="header-btn"><a href="##">{"<"}</a></li>
                    <li className="header-tit">登录</li>
                    <li className="header-btn">搜索</li>
                </ul>
            </div>
        )
    }
});

var Footer =  React.createClass({
    getDefaultProps:function () {
        return {
            footerData:["首页","列表","购物车","我的"]
        }

    },
    render:function () {
        return (
            <div className="footer">
                <ul>
                    {
                        this.props.footerData.map(function (ele,index) {
                            return <li key={index}>{ele}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
});

var Content = React.createClass({
    render:function () {
        var contentStyle = {"bottom":this.props.hasFooter?"50px":"0"};
        return (
            <div className="content" style={contentStyle} >{this.props.children}</div>
        )
    }
});

//mvvm;

var LoginList = React.createClass({
    getInitialState:function () {
        //需要是否显示密码
        //是否记住密码
        return {
            showPassword:false,
            remmeber:true,
            password:"222222",
            username:"lining"
        }
    },
    changeShowPassword:function () {
        this.setState({
            showPassword:!this.state.showPassword
        })
    },
    filterPassword:function (ev) {

        //setState 不是同步的
        this.setState({
            password:ev.target.value.replace(/sb/g,"")
        });
        //this.state.password 是用保存密码的
        //ev.target.value = ev.target.value.replace(/sb/g,"")
        //m(state)=>v(password的输入框) =>(change)=>m(state) =>(render)=>v(password的输入框)
    },
    filterUsername:function (ev) {
        //ev.target.value 用户输入的内容
        //对用户输入的内容可以进行过滤在赋值个state（v=m）
        //当state发生改变 视图会重新渲染（m=>v）
        this.setState({
            username:ev.target.value.replace(/m/g,"*")
        });
    },
    loginIn:function () {

        //登录
        console.log(this.state.username);
        console.log(this.state.password);
        //正则验证
       // 数据请求
            //失败 提示
            //成功 登录成功（保存用户id，记住密码需要保存在local，否则se），跳转到其他页面

    },
    selectReact:function (ev) {
        console.log(ev.target.value)
        console.log(ev.target.selectedIndex)
    },
    render:function () {
       // console.log(this.state.password);
        var passwordType = this.state.showPassword?"text":"password";
        return (
            <ul className="login-list">
                <li>
                    <input type="text"  value={this.state.username} onChange={this.filterUsername} className="text-bar" />
                </li>
                <li>
                    <input type={passwordType} onChange={this.filterPassword} className="text-bar" value={this.state.password}  />
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
                        <input type="checkbox" onClick={this.changeShowPassword} />
                        <span>显示密码</span>
                    </label>
                </li>
                <li>
                    <button className="login-in" onClick={this.loginIn}>登录</button>
                </li>
                <li>
                    <a className="go-reg">注册</a>
                </li>

                <li>
                    <select onChange={this.selectReact}>
                        <option id="99">react</option>
                        <option id="9229">react native</option>
                        <option id="93339">react canvas</option>
                    </select>
                </li>
            </ul>
        )
    }
});

var LoginPage = React.createClass({

    render:function () {
        return (
            <div className="page" id="login-page">
                <Header/>
                <Content hasFooter={false}>
                    <LoginList/>
                </Content>

            </div>
        )
    }
});
ReactDOM.render(<LoginPage/>,document.getElementById("main"));

