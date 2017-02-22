/*
 * 首页地图组件
 * */
import React, {Component, PropTypes} from 'react'
import PerFeedback from './perFeedback'
export default class Feedback extends Component {
    componentDidMount() {
        this.props.indexFeedback()
    }

    render() {
        const feedData = Object.values(this.props.feedData)
        feedData.sort((a, b) => -parseInt(a.CommentTime.replace(/[^0-9]+/g, '')) + parseInt(b.CommentTime.replace(/[^0-9]+/g, '')))
        const arrFeed = []
        feedData.forEach((item)=>{arrFeed.push(<PerFeedback backData={item}/>)})
        return (
            <div id="feedback">
                <div className="feedback-total">
                    共 {feedData.length} 条反馈信息
                </div>
                {arrFeed}
            </div>
        );
    }
}