/*
 * 系统首页主体显示组件
 * */
import React, {Component, PropTypes} from 'react'
import {Icon, Tabs} from 'antd'
import './index.scss'
import Cartogram from './cartogram'
import Analysis from './userAnalysis'
import Geo from './geo'
import System from './system'
import Feedback from './feedback'
const TabPane = Tabs.TabPane;
export default class Index extends Component {

    render() {
        const {init,indexInit,indexCart,indexFeedback,indexSysnotice} = this.props;
        return (
            <div id="index">
                <Cartogram init={init.statics} indexInit={indexInit}/>
                <nav className="topnav">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="bar-chart"/>用户分析</span>} key="1">
                            <Analysis cartData={init.indexCart} indexCart={indexCart}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="environment"/>地图</span>} key="2">
                            <Geo/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="notification"/>系统公告</span>} key="3">
                            <System noticeData={init.indexSysnotice} indexSysnotice={indexSysnotice}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="exception"/>反馈信息</span>} key="4">
                            <Feedback indexFeedback={indexFeedback} feedData={init.indexFeedback}/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        );
    }
}