import {Header,Footer,Content} from  "../../common/components/common"

import React, {Component} from  "react"




class IndexPage extends Component　{
    constructor(props){
        super(props)
    }
    handleClick(id){
        console.log(id);
        this.props.changeClassID(id);
    }
    render (){
        return (
            <div className="page" id="index-page">
                <Header hasBack={false} title="首页"/>
                <Content>
                    <p style={{padding:"20px",fontSize:"30px"}}>首页空空如也</p>
                </Content>
                <Footer active={0}/>
            </div>
        )
    }
}
export  default  IndexPage