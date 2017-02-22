import React, {Component, PropTypes} from 'react'
import Records from './records'
import Options from './options'
import {Icon, Tabs} from 'antd'
import './identify.scss'

const TabPane = Tabs.TabPane;
class Identification extends Component {

    render(){
        return (
            <div id="identification">
                <nav className="iden-nav">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="credit-card" />单位认证</span>} key="1">
                            <Records/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="2">
                            <Options/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        )
    }
}
export default Identification;