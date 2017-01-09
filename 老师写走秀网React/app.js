/**
 * Created by hasee on 2017/1/4.
 */
import React from  "react"
import ReactDOM from  "react-dom"
import {Router,Route,hashHistory} from "react-router"

/*商品模块 */
import IndexPage from "./product/main/index-page"
import ProductDetailPage from "./product/main/product-detail-page"
import ProductListPage from "./product/main/product-list-page"
import FootmarkPage from "./product/main/footmark-page"

/*订单模块 */
import CartPage from "./order/main/cart-page"
import ConfirmPage from "./order/main/confirm-page"
import OrderListPage from "./order/main/order-list-page"

/*用户模块*/
import LoginPage from "./user/main/login-page"
import UserCenterPage from "./user/main/user-center-page"


/*路由管理*/
ReactDOM.render(<Router history={hashHistory}>

    <Route path="/" component={IndexPage} />
    <Route path="/list" component={ProductListPage} />
    <Route path="/detail(/:goodsID)" component={ProductDetailPage} />
    <Route path="/footmark" component={FootmarkPage} />

    <Route path="/cart" component={CartPage} />
    <Route path="/confirm" component={ConfirmPage} />
    <Route path="/order-list" component={OrderListPage} />

    <Route path="/login" component={LoginPage} />
    <Route path="/user-center" component={UserCenterPage} />

</Router>,document.getElementById("root"));



/*模块热替换*/
if (module.hot) {
    module.hot.accept();
}

