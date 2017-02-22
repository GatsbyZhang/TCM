import React, {Component, PropTypes} from 'react'
import './driver.scss'
import AllDriver from './allDriver'
import OptionDriver from './optionDriver'
import UnbindDriver from './unbindDriver'
import {Icon, Tabs} from 'antd'
const TabPane = Tabs.TabPane;
class Driver extends Component {

    render() {
        const {driver} = this.props
        return (
            <div id="driver">
                <nav className="driver-nav">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="appstore-o" />全部</span>} key="1">
                            <AllDriver/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="user"/>未绑定的单位用户</span>} key="2">
                            <UnbindDriver/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o"/>操作记录</span>} key="3">
                            <OptionDriver/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        )
    }
}
export default Driver;