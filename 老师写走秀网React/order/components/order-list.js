
import React, {Component} from "react"
import "../styles/order-list.css"

class OrderProductInfo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        //this.props.productInfo
        var data = this.props.productInfo||[];
        console.log(data);
        return (
            <ul className="order-product-info">
                {
                    data.map((ele,i)=><li key={i}>
                        <img src={ele.goodsListImg}/>
                        <div className="text-info">
                            <p>{ele.goodsName} </p>
                        </div>
                        <div className="num-info">
                            <p><em>${ele.price}</em></p>
                            <p>*{ele.number}</p>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}

export {OrderProductInfo}










































/*


import "../styles/order-list.css"
import React,{Component} from "react"

class  OrderState extends Component {
    constructor(props){
        super(props)
    }
    render(){
        var state = this.props.stateData||[];
        return (
            <ul>
                {
                    state.map((e,i)=><li key={i}>
                        {e}
                    </li>)
                }
            </ul>
        )
    }
}


class  OrderItem extends Component {
    constructor(props){
        super(props)
    }
    render(){
        var ele = this.props.children||{};
        console.log(ele)
        return (
            <li className="o-pro-item">
                <img src={ele.goodsListImg}/>
                <div className="o-pro-info">
                    <p className="pro-name">{ele.goodsName}</p>
                    <p className="pro-name">{ele.goodsType}</p>
                </div>
                <div className="pro-num">
                    <p><em>{ele.price}</em></p>
                    <p>*{ele.number}</p>
                </div>
            </li>
        )
    }
}


class  OrderList extends Component {
    constructor(props){
        super(props)
    }
    render(){
        var ele = this.props.children||{};
        console.log(this.props.orderData);
        return (
            <ul className="order-list">
                {
                    this.props.orderData.map((e,i)=><li  key={i}>
                        <ul className="o-pro-list">
                            {

                                e.orderProductData.map((e,i)=> <OrderItem key={i}>{e}</OrderItem>)
                            }
                        </ul>
                        <div className="total">
                            共0件，商品支付1000
                        </div>
                        <div>
                            <span className="o-state">待付款</span>
                            <button className="o-btn">立即付款</button>
                            <button className="o-btn">取消订单</button>
                        </div>
                    </li>)
                }
            </ul>
        )
    }
}
export {OrderItem,OrderState,OrderList}*/
