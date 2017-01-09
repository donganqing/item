/**
 * Created by hasee on 2016/12/30.
 */

import "../styles/product-list.css"
import React,{Component} from "react"
import {Link} from "react-router"

/*写组件的时候，尽量 把组件名写完整，描述清晰*/
class  ProductList extends Component {
     constructor(props){
         super(props)
     }
     toDetail(ele){

         var footmarkData = JSON.parse(window.localStorage.getItem("footmarkData")||"[]");

         for(var i=0;i<footmarkData.length;i++){
             if(footmarkData[i].goodsID==ele.goodsID){
                 footmarkData.splice(i,1);
                 break
             }
         }
         footmarkData.unshift(ele);
         window.localStorage.setItem("footmarkData",JSON.stringify(footmarkData));

         window.location.hash = "#/detail/"+ele.goodsID;

         //JSON.stringify()
     }
     render(){
         return (
             <ul className="product-list">
                 {
                     this.props.productData.map((ele,i)=><li key={i} onClick={()=>this.toDetail(ele)}>
                         <img src={ele.goodsListImg}/>
                         <p style={{"lineHeight":"30px"}}>{ele.goodsName}</p>
                     </li>)
                 }
             </ul>
         )
     }

}
ProductList.defaultProps={
    productData:[]
};


export default ProductList


//红:x,蓝：y
//y-1 =x  条件1
//x-1 =2y 条件2
//


for(var x =1;x<1000;x++){
    for(var y =1;y<1000;y++){
            //x y 的关系
            break
    }
}

// 酒2块钱，2个空瓶可以换1瓶酒，4个瓶盖可以换1瓶酒，10块钱能喝多少酒


var x= 1;
function fn(){

    console.log(x)
};
function show(){
    var x = 2;
    fn();
}
show();
