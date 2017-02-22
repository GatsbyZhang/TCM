/**
 * Created by SWSD on 2017-01-06.
 */
import React, {Component, PropTypes} from 'react';
import Tab1 from './tab1.jsx';
import Tab2 from './tab2.jsx';
import Tab3 from './tab3.jsx';
import Tab4 from './tab4.jsx';
import Tab5 from './tab5.jsx';
import Tab6 from './tab6.jsx';
import Tab7 from './tab7.jsx';
import Tab8 from './tab8.jsx';
import Tab9 from './tab9.jsx';
import Tab10 from './tab10.jsx';
import Tab11 from './tab11.jsx';
import {Tabs, Icon} from 'antd';
const TabPane = Tabs.TabPane;
class Main extends Component {
    componentDidMount(){
        //高级搜索结果显示高亮
        const {searchTodos}=this.props;
        let regex;
        $('#sendGoods').highlightRegex();
        regex = new RegExp(searchTodos.reg, 'ig');
        if (typeof regex !== 'undefined') {
            $('#sendGoods').highlightRegex(regex);
        }
    }
    render() {
        const {searchTodos}=this.props;
        let tab=searchTodos.tab;
        return (
            <div className="sendGoods">
                <Tabs defaultActiveKey={tab?tab:'1'}>
                    <TabPane tab={<span><Icon type="user" />用户管理</span>} key="1">
                       <div className="sendGoogs-tab">
                           <Tab1 {...this.props}/>
                       </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="inbox" />发货合同</span>} key="2">
                        
                        <div className="sendGoogs-tab">
                        <Tab2 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="menu-unfold" />收货单位</span>} key="3">
                        
                        <div className="sendGoogs-tab">
                        <Tab3 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="pay-circle-o" />租赁合同</span>} key="4">
                        
                        <div className="sendGoogs-tab">
                        <Tab4 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="pay-circle" />租赁单位</span>} key="5">
                        
                        <div className="sendGoogs-tab">
                        <Tab5 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="book" />任务</span>} key="6">
                        
                        <div className="sendGoogs-tab">
                        <Tab6 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="pushpin-o" />小票</span>} key="7">
                        
                        <div className="sendGoogs-tab">
                        <Tab7 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="team" />驾驶员</span>} key="8">
                        
                        <div className="sendGoogs-tab">
                        <Tab8 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="exception" />自有车辆</span>} key="9">
                        
                        <div className="sendGoogs-tab">
                        <Tab9 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="setting" />后台配置</span>} key="10">
                        
                        <div className="sendGoogs-tab">
                        <Tab10 {...this.props}/>    
                        </div>
                    </TabPane>
                    <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="11">
                        
                        <div className="sendGoogs-tab">
                        <Tab11 {...this.props}/>    
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default Main;