class Select extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            show:true,
            selectedIndex:0
        };
        //this.titClick=this.titClick.bind(this)
    }
    titClick(){
        console.log(this)
        this.setState({show:!this.state.show})
    }
    selectChange(index){

        this.setState({
            selectedIndex:index,
            show:false
        })
    }
    render () {
        //this.titClick()
        return (
            <div className="select-wrap">
                <h3 onClick={()=>this.titClick()}>
                    {this.props.selectData[this.state.selectedIndex]}
                    {/*显示选中的内容*/}
                </h3>
                <ul style={{"display":this.state.show?"block":"none"}} className="select-list">
                    {
                        this.props.selectData.map( (ele,index)=> {
                            return <li onClick={()=>this.selectChange(index)} key={index}>{ele}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
};

let arr = ["react","react Native","angular","react canvas","vue"];
ReactDOM.render(<Select selectData={arr} />,document.body);