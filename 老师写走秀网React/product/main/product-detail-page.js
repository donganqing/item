import {Header,Content} from  "../../common/components/common"
import  "../styles/swiper-3.3.1.min.css"
import  "../styles/detail.css"
import React, {Component} from  "react"
import {Tools} from  "../../common/tools/tools"

class DetailPage extends Component {
    constructor(props){
        super(props);

        //需要的数据
        this.state={
            bannerList:[],
            goodsName:"",
            price:"",
            number:"",
            goodsID:""
        };



        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{
           goodsID:this.props.params.goodsID
        },(data)=>{
            //如果有数据的话
            if(data){
                console.log(data);
                this.setState({
                    bannerList:JSON.parse(data[0].imgsUrl),
                    goodsName:data[0].goodsName,
                    goodsID:data[0].goodsID
                })
            }

        })
    }
    addCart () {
        //判断用户是否登录
        var userID =Tools.getUserID();
        userID && $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
            {userID:userID,goodsID:this.state.goodsID,number:1},function(data){
               console.log(data);
                if(data==1){
                   alert("添加成功")
                }else {
                   alert("添加失败")
                }
            })
    }
    toCart(){
        //判断用户是否登录,登录以后再跳转
        Tools.getUserID()&&(window.location.hash = "#/cart")

    }
    render(){
        return (
            <div className="page" id="detail-page">
                <Header title="商品详情" rightBtn={<a href="javascript:;" onClick={this.toCart}>购物车</a>} />
                <Content>

                        <div className="swiper-container" ref="swiper-container" style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
                            <div className="swiper-wrapper">
                                {
                                    this.state.bannerList.map((ele,i)=><div key={i} className="swiper-slide">
                                        <img src={ele} />
                                    </div>)
                                }
                            </div>
                        </div>
                    <div ref="pagination" className="swiper-self-pagination"></div>
                    <div className="text-info">
                        <div className="p-name">{this.state.goodsName}</div>
                        <div className="p-price">￥222</div>
                        <div className="p-number">购买人数：100000</div>
                    </div>
                    <div><button onClick={()=>this.addCart()} className="add-cart">添加到购物车</button></div>
                </Content>
            </div>
        )
    }
    componentDidMount(){
        this.swiper = new Swiper(this.refs["swiper-container"],{
            pagination:  this.refs.pagination,
            slidesPerView: '3',
            loop:true
        })
        console.log(this.swiper)
    }
    componentDidUpdate(){
        //让swiper更新
        this.swiper.update();
        this.swiper.reLoop();
        /*更新Swiper，这个方法包含了updateContainerSize，updateSlidesSize，updateProgress，updatePagination，updateClasses方法。
         可选参数：updateTranslate，默认false，设置为true则重新计算Wrapper的位移。*/
        //this.swiper.update()*/
        /*reLoop重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，这个方法是mySwiper.destroyLoop()和 mySwiper.createLoop()的结合体。*/
    }
}

/*class DetailPage extends Component　{
    constructor(props){
        super(props)
        this.state={
            imgsUrl:[],/!*轮播图*!/
            price:"",
            buynumber:"",
            goodsName:"",
            discount:""

        };
        $.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
            {goodsID:this.props.params.pid},(data)=>{
                console.log(data[0])
                this.setState({
                    imgsUrl:JSON.parse(data[0].imgsUrl),
                    price:data[0].price,
                    buynumber:data[0].buynumber,
                    goodsName:data[0].goodsName,
                    discount:data[0].discount
                })
            })
    }
    addBtnClick(){

        $.get("http://datainfo.duapp.com/shopdata/updatecar.php",
            {userID:fnBase.getUserId(),goodsID:this.props.goodsId,number:1},function(data){
                if(data){
                    alert("添加成功")
                }
            })
    }
    render (){
        return (
            <div>
                <Header title="商品详情" />
                <Content>

                    <div className="detail-cont"  >
                        <div ref="swiperContainer" className="swiper-container"  style={{width:"180vw",marginLeft:"-40vw",position:"relative"}}>
                            <div  className="swiper-wrapper">
                                {
                                    this.state.imgsUrl.map(function(ele,i,arr){
                                        return <div key={i} className="swiper-slide"><img src={ele}/></div>
                                    })
                                }

                            </div>

                        </div>
                        <div ref="pagination" className="swiper-self-pagination"></div>
                        <div className="text-info">
                            <p>{this.state.goodsName}</p>
                            <p><em>{this.state.price}</em></p>
                            <p>{this.state.buynumber}</p>
                        </div>
                        <div className="look-detail">查看商品详情</div>
                        <div className="add-cart">
                            <button onClick={()=>this.addBtnClick()}>添加到购物车</button>
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
    componentDidMount(){

        this.swiper = new Swiper(this.refs.swiperContainer, {
            pagination:  this.refs.pagination,
            slidesPerView: '3',
            loop:true
        });
    }
    componentDidUpdate(){
        /!*重新对需要循环的slide个数进行计算，当你改变了slidesPerView参数时需要用到，这个方法是mySwiper.destroyLoop()和 mySwiper.createLoop()的结合体。*!/
        this.swiper.reLoop();

    }
}*/
export  default  DetailPage