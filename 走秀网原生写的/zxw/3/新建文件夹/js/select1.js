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

var arr = ["react","react Native","angular","react canvas","vue"];
ReactDOM.render(<Select selectData={arr} str={[1,24]} />,document.body);