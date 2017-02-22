import React,{Component} from 'react';
import Tab1 from '../sendGoods/tab1.jsx';
import Tab2 from '../sendGoods/tab2.jsx';
import Tab3 from '../sendGoods/tab3.jsx';
import Tab4 from '../sendGoods/tab6.jsx';
import Tab5 from '../sendGoods/tab7.jsx';
import Tab6 from '../sendGoods/tab11.jsx';
import {Tabs, Icon} from 'antd';
const TabPane = Tabs.TabPane;
export default class Main extends Component{
    render(){
        return <div className="takeGoods">
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="user" />用户管理</span>} key="1">
                   <div className="takeGoods-tab">
                <Tab1 {...this.props} />
                            
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="menu-unfold" />发货合同</span>} key="2">
                   
                    <div className="takeGoods-tab">
                    <Tab2 {...this.props}/>     
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="inbox" />发货单位</span>} key="3">
                   
                    <div className="takeGoods-tab">
                    <Tab3 {...this.props}/>     
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="book" />任务</span>} key="4">
                   
                    <div className="takeGoods-tab">
                    <Tab4 {...this.props}/>     
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="pushpin-o" />小票</span>} key="5">
                   
                    <div className="takeGoods-tab">
                    <Tab5 {...this.props}/>     
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="6">
                   
                    <div className="takeGoods-tab">
                    <Tab6 {...this.props}/>     
                    </div>
                </TabPane>
                </Tabs>
        </div>
    }
}