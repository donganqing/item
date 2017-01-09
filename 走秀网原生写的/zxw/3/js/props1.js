/**
 * Created by hasee on 2016/12/27.
 */

var Child = React.createClass({
    handleClick:function () {
        this.props.childChangeValue(20)
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
    changeValue:function (val) {
        this.setState({
            value:val
        })
    },
    render:function () {
        //必须有listData，
        //listData 必须是数组
        return(
            <div>
                <Text value={this.state.value} />
                <button onClick={this.changeValue.bind(this,10)}>父组件的按钮</button>
                <Child childChangeValue={this.changeValue} />
            </div>
        )
    }
});



ReactDOM.render(<App />,document.getElementById("main"));