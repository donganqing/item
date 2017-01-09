import {Header,Content} from  "../../common/components/common"
import ProductList from "../components/product-list"
import React, {Component} from  "react"

class FootmarkPage extends Component {
    constructor(props){
        super(props) ;//让react 的Component 帮你实现组件的方法
        this.state= {
            productData:JSON.parse(window.localStorage.getItem("footmarkData")||"[]")
        }
    }
    clearFootermark(){
        window.localStorage.removeItem("footmarkData")
        this.setState({
            productData:[]
        })
    }
    render() {
        console.log("render");
        return (
            <div className="page" id="list-page">
                <Header title="历史记录"  rightBtn={<a onClick={()=>this.clearFootermark()}>清除</a>}  />

                <Content hasIScroll={true} >
                    <ProductList productData={this.state.productData} />
                </Content>

            </div>
        )
    }
}


export default  FootmarkPage


