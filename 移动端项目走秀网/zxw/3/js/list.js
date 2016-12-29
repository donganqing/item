/**
 * Created by hasee on 2016/12/27.
 */

Array.prototype.quChong=function () {
    //var listData = [1,2,1,3,4,51,2,3]; this
    var arr = [];
    arr = [1,2,3,4,51];
    return arr
};
var listData = [1,2,1,3,4,51,2,3];

//5个0-100的随机数 ，不重复。
parseInt(Math.random()*100);
var arr = [];
arr = [22,56,53,58,57];

var List  = React.createClass({
    getDefaultProps:function () {
        //创建组件的时候就会执行
        console.log("getDefaultProps");
        return {
            listData:[]
        }
    },
    getInitialState:function () {
        console.log("getInitialState");
        return {
            listShow:true
        }
    },
    changeListState:function () {
        //修改状态的方法
        this.setState({
            listShow:!this.state.listShow
        })
    },
    render:function () {
        var listStyle = {"display":this.state.listShow?"block":"none"};
        var btnHtml = this.state.listShow?"隐藏":"显示";
        return (
           <div>
               <button onClick={this.changeListState}>{btnHtml}</button>
               <ul style={listStyle}>
                   {
                       this.props.listData.map(function (ele,index) {
                           return <li key={index}>{ele}</li>
                       })
                   }
               </ul>
           </div>
        )
    }
});
ReactDOM.render(<List listData={listData} aa="1" ss="22" />,document.getElementById("main"));