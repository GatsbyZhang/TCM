/*
 * 首页系统公告一条
 * */
import React, {Component, PropTypes} from 'react'
export default class PerSystem extends Component {
    render() {
        const {noticeData} = this.props
        const feedDate = new Date(parseInt(noticeData.SendDate.replace(/[^0-9]+/g, '')))
        const formatDate = feedDate.toLocaleDateString()+" "+feedDate.toLocaleTimeString()
        return (
            <div className="system">
                <div className="content clearfix">
                    <p style={{color:"red",marginBottom:"10px"}}>标题：{noticeData.Title}</p>
                    <p>内容：{noticeData.Content}</p>
                    <div className="bottom right">
                        <div className="left">发送人：{noticeData.UName}</div>
                        <div className="left send-date">发送时间：{formatDate}</div>
                    </div>
                </div>
            </div>
        );
    }
}