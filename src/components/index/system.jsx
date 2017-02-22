/*
 * 首页系统公告组件
 * */
import React, {Component, PropTypes} from 'react'
import PerSystem from './perSystem'
import {Icon} from 'antd'
import AddAnnounce from './addAnnounce'
export default class System extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    changeState() {
        this.setState({visible: !this.state.visible})
    }

    componentDidMount() {
        this.props.indexSysnotice()
    }

    render() {
        const {indexSysnotice,noticeData} = this.props
        const noticedata = Object.values(noticeData)
        noticedata.sort((a, b) => -parseInt(a.SendDate.replace(/[^0-9]+/g, '')) + parseInt(b.SendDate.replace(/[^0-9]+/g, '')))
        if (!noticedata.length) {
            return (
                <div id="system">
                    <AddAnnounce indexSysnotice={indexSysnotice} visible={this.state.visible} changeState={this.changeState.bind(this)}/>
                    <div className="system-top clearfix">
                        <h6 className="left"> 暂无公告信息</h6>
                        <div className="add right"><Icon title="新增公告" type="plus-circle-o"
                                                         onClick={this.changeState.bind(this)}/></div>
                    </div>
                </div>
            )
        } else {
            let noticeArr = []
            noticedata.forEach((item) => noticeArr.push(<PerSystem noticeData={item}/>))
            return (
                <div id="system">
                    <AddAnnounce indexSysnotice={indexSysnotice} visible={this.state.visible}
                                 changeState={this.changeState.bind(this)}/>
                    <div className="system-top clearfix">
                        <h6 className="left">公告列表<span>(共{noticedata.length}条公告信息)</span></h6>
                        <div className="add right"><Icon title="新增公告" type="plus-circle-o"
                                                         onClick={this.changeState.bind(this)}/></div>
                    </div>
                    {noticeArr}
                </div>
            )
        }
    }
}