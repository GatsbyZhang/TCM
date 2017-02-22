import React from 'react';
import CarsAll from './carsAll.jsx'
import Breakdown from './breakdown.jsx'
import Operation from './operation.jsx'
import {Tabs,Icon} from 'antd';
const TabPane = Tabs.TabPane;

import './carsMng.scss';
import 'COMMON/rightkeys'
export default class CarsIndex extends React.Component {
    
    render() {
        return <div id="carsManagement">
            <Tabs defaultActiveKey="1" >
                <TabPane tab={<span><Icon type="appstore-o" />全部</span>} key="1">
                    <CarsAll {...this.props}/>
                </TabPane>
                <TabPane tab={<span><Icon type="file-excel" />故障记录</span>} key="2">
                    <Breakdown {...this.props}/>
                </TabPane>
                <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="3">
                    <Operation {...this.props}/>
                </TabPane>
            </Tabs>
        </div>
    }
}