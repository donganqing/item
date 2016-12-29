/**
 * Created by hasee on 2016/12/27.
 */









var Child = React.createClass({
    handleClick:function () {
        console.log("修改App组件的state");
        //触发 changeAppValue ，传递参数100
        Action.emit("changeAppValue",100)
    },
    render:function () {
        return <button onClick={this.handleClick}>子组件的按钮</button>
    }
});

var Text = React.createClass({
    render:function () {
        return <p>{this.props.value}</p>
    }
});

var App = React.createClass({
    getInitialState:function () {
      return {
          value:1
      }
    },
    componentWillMount:function () {
        //注册一个方法，可以修改 this.state.value
        Action.on("changeAppValue",function (val) {
            this.setState({
                value:val
            })
        }.bind(this))
    },
    render:function () {
        //必须有listData，
        //listData 必须是数组
        return(
            <div>
                <Text value={this.state.value} />
                <Child  />
            </div>
        )
    }
});



ReactDOM.render(<App />,document.getElementById("main"));