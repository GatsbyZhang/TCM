import React, {Component, PropTypes} from 'react'
import './configuration.scss'
import {Icon, Tabs} from 'antd'
const TabPane = Tabs.TabPane;
import AccessList from './accessList'
import OptionConfig from './optionConfig'
import ChooseModule from './chooseModule'
import TongcheFiled from './tongcheFiled'
class Configuration extends Component {
    render(){
        return (
            <div id="configuration">
                <nav className="configuration-nav">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="bars" />接入列表</span>} key="1">
                            <AccessList/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="ellipsis" />砼车字段</span>} key="2">
                            <TongcheFiled/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="addfile" />选择模版</span>} key="3">
                            <ChooseModule/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="4">
                            <OptionConfig/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        )
    }
}
export default Configuration;