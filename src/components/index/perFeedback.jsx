/*
 * 首页地图组件
 * */
import React, {Component, PropTypes} from 'react'
import {Rate} from 'antd'
import severRoot from 'CONSTANTS'
export default class PerFeedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showOrhide: false
        }
    }
    showDetail() {
        this.setState({
            showOrhide: !this.state.showOrhide
        })
    }

    render() {
        const divHeight = this.state.showOrhide ? 375 : 120
        const {backData} = this.props
        const attachment = []
        const feedDate = new Date(parseInt(backData.CommentTime.replace(/[^0-9]+/g, '')))
        const formatDate = feedDate.toLocaleDateString()+" "+feedDate.toLocaleTimeString()
        backData.Pictures.forEach((item)=>attachment.push(<img src={severRoot+item.FilePath}/>))
        return (
            <div className="feedback" ref="feedback" style={{height:divHeight }}>
                <div className="title clearfix">
                    <div className="left">
                        <img src={severRoot+backData.UHeadImg}/>
                    </div>
                    <div className="left user">
                        <div><span className="user-name">反馈者：{backData.UName}</span><br/>电话：<span>{backData.UPhone}</span></div>
                        <div>软件评分：<Rate value={backData.Level}/></div>
                    </div>
                    <div className="right feed-date" style={{color: "#0000dd"}}>
                        {formatDate}
                    </div>
                </div>
                <div className="content">反馈内容：<p>{backData.Content}</p>
                </div>
                <div className="feed-img clearfix">
                    <h6>附件信息</h6>
                    <div className="img">
                        {attachment}
                    </div>
                </div>
                <div className="detail" onClick={this.showDetail.bind(this)}>
                    {this.state.showOrhide?"<<收起":"详情>>"}
                </div>
            </div>
        );
    }
}