/**
 * Created by hasee on 2016/12/27.
 */

var List = React.createClass({
    propTypes:{
        listData:React.PropTypes.array.isRequired
    },
    render:function () {
        //必须有listData，
        //listData 必须是数组
        return(
            <ul>
                {
                    this.props.listData.map(function (e,i) {
                        return <li key={i}>{e}</li>
                    })
                }
            </ul>
        )
    }
});



ReactDOM.render(<List listData={[1,2,4]}  />,document.getElementById("main"));