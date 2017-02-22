import React,{Component} from 'react';
import Tab1 from '../sendGoods/tab1.jsx';
import Tab2 from '../sendGoods/tab4.jsx';
import Tab3 from '../sendGoods/tab3.jsx';
import Tab4 from '../sendGoods/tab7.jsx';
import Tab5 from '../sendGoods/tab9.jsx';
import Tab6 from '../sendGoods/tab8.jsx';
import Tab7 from '../sendGoods/tab11.jsx';
import {Tabs, Icon} from 'antd';
const TabPane = Tabs.TabPane;
export default class Main extends Component{
    render(){
        return <div className="rent">
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="user" />用户管理</span>} key="1">
                    
                    <div className="rent-tab">
                        <Tab1 {...this.props}/>
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="pay-circle-o" />租赁合同</span>} key="2">
                    
                    <div className="rent-tab">
                    <Tab2 {...this.props}/>    
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="menu-fold" />发货单位</span>} key="3">
                    
                    <div className="rent-tab">
                    <Tab3 {...this.props}/>    
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="tag-o" />小票</span>} key="4">
                    
                    <div className="rent-tab">
                    <Tab4 {...this.props}/>    
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="exception" />车辆</span>} key="5">
                    
                    <div className="rent-tab">
                    <Tab5 {...this.props}/>    
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="team" />驾驶员</span>} key="6">
                    
                    <div className="rent-tab">
                    <Tab6 {...this.props}/>    
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="7">
                    
                    <div className="rent-tab">
                    <Tab7 {...this.props}/>    
                    </div>
                </TabPane>
            </Tabs>
        </div>
    }
}