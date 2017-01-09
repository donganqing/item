/**
 * Created by hasee on 2017/1/4.
 */
import {Header,Content} from  "../../common/components/common"
import React,{Component} from  "react"
import {OrderProductInfo} from "../components/order-list"
import "../styles/confirm.css"



class ConfirmFooter extends Component {
    constructor(props){
        super(props)
    }
    orderSubmit(){
        console.log("提交订单,生成真实订单");
        console.log(this.props.orderData);
        console.log(this.props.totalNum);
        console.log(this.props.totalPrice);
        //1未付款，2未发货，3待收货，4待评价

        //订单的数据模型
        var orderItem = {
            orderID: new Date().getTime(),
            orderState:1,
            totalNumber:this.props.totalNum,
            totalPrice:this.props.totalPrice,
            orderProductInfo:this.props.orderData.productInfo
        };

    //window.localStorage.getItem("orderData") ==null
        // 之前没有订单的话，让订单的数组等于一个空数组
       var orderArray  = JSON.parse(window.localStorage.getItem("orderData")||"[]") ;

        //在订单列表里面，添加当前订单
        orderArray.push(orderItem);
        //保存在localStorage里面
        console.log(orderArray)
        window.localStorage.setItem("orderData",JSON.stringify(orderArray))
        window.localStorage.removeItem("cartData");
        console.log("这里需要清除购物车的数据")
        window.location.hash="#/user-center"
    }
    render(){

        return(
            <div className="confirm-footer">
                <p className="num-info">
                    <span>总数:<em>{this.props.totalNum}</em></span> &nbsp;
                    <span>总金额:<em>{this.props.totalPrice}</em></span>
                </p>
                <button onClick={()=>this.orderSubmit()}>提交订单</button>
            </div>
        )
    }
}

class ConfirmPage extends Component {
    constructor(props){
        super(props);
        //现在本存储里面获取
        var data =  window.localStorage.getItem("cartData");
        //格式转换，

        data = JSON.parse(data);
        this.state = {
            orderData:data,
            yunFei:10
        };
    }
    render() {
        var data = this.state.orderData;
        var allPrice = this.state.yunFei+data.totalPrice;
        return (
            <div className="page" id="confirm-page">
                <Header title="确认订单" />
                <Content hasFooter={true}>
                    <div className="ads-info">收货地址</div>
                    <div className="order-info">
                        <OrderProductInfo productInfo={data.productInfo} />
                        <div className="order-price">
                            <p><em>运费：{this.state.yunFei}</em></p>
                            <p><em>实付（含运费）:{allPrice}</em></p>

                        </div>
                        <textarea className="user-info" ></textarea>

                    </div>

                </Content>
                <ConfirmFooter totalNum={data.totalNumber} orderData={data}  totalPrice={allPrice} />
            </div>
        )
    }
}

export default ConfirmPage