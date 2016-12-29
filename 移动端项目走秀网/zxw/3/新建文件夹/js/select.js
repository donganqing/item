var Select = React.createClass({

    propTypes: {
        selectData: React.PropTypes.array.isRequired,
        str: React.PropTypes.string.isRequired
    },
    getInitialState:function () {
        //设置默认状态
        return {
            show:false,
            selectedIndex:0
        }
    },
    titClick:function () {
        //当标题点击的时候，让下来菜单 隐藏显示
        this.setState({
            show:!this.state.show
        })
    },
    selectChange:function (index) {
        //修改selectedIndex,变成点击的li的下标index
        //让下拉列表消失
        this.props.fnChange(index);
        this.setState({
            selectedIndex:index,
            show:false
        })

    },
    render:function () {
        var listStyle = {"display":this.state.show?"block":"none"};
        return (
            <div className="select-wrap">
                <h3 onClick={this.titClick} className={this.state.show?"select-show":""}>
                    {this.props.selectData[this.state.selectedIndex]}
                    {/*显示选中的内容*/}
                </h3>
                <ul style={listStyle} className="select-list">
                    {
                        this.props.selectData.map(function (ele,index) {
                            return <li onClick={this.selectChange.bind(this,index)} key={index}>{ele}</li>
                        }.bind(this))
                    }
                </ul>
            </div>
        )
    }
});


var SelectCont = React.createClass({

    getInitialState:function () {
          return {
              titleData:[],
              selectedIndex:0
          }
    },
    componentWillMount:function () {
        //在组件即将渲染的时候，通过props.selectData修改titleData

        //titleData只想要selectData里面的title
        this.setState({
            titleData:this.props.selectData.map(function (ele,index) {
                return ele.title
            })
        })
    },
    changeIndex:function (index) {
        this.setState({
            selectedIndex:index
        })
    },
    render:function () {
        console.log(this.state.selectedIndex);
     return (
         <div>
             <Select fnChange={this.changeIndex} selectData={this.state.titleData} str="222" />
             <div className="cont">
                 {this.props.selectData[this.state.selectedIndex].cont}
             </div>
         </div>
     )
    },
    componentDidMount:function () {
        //this.changeIndex(2)
    }
});

var selectData = [
    {
        "title":"react",
        "cont":"react 是一个js的框架，虚拟dom，组件化开发，单项数据流，声明周期"
    },
    {
        "title":"react Native",
        "cont":"react Native 可以使用js 开发native app的框架"
    },
    {
        "title":"angular",
        "cont":"angular 是一个非常牛逼的框架"
    }];

ReactDOM.render(<SelectCont selectData={selectData}  />,document.body);