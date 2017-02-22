import React, {Component, PropTypes} from 'react'
import './compact.scss'
import {Icon, Tabs} from 'antd'
import DevCompact from './depCompact'
import LeaseCompact from './leaseCompact'
import OptionCompact from './optionCompact'
const TabPane = Tabs.TabPane;
class Compact extends Component {
    
    render(){
        return (
            <div id="compact">
                <nav className="compact-nav">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="menu-fold" />发货合同</span>} key="1">
                            <DevCompact {...this.props}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pay-circle-o" />租赁合同</span>} key="2">
                            <LeaseCompact {...this.props}/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="3">
                            <OptionCompact {...this.props}/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        )
    }
}
export default Compact;