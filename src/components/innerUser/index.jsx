import React from 'react';
import User from './user.jsx'
import Operation from './operation.jsx'
import AddUser from './addUser.jsx'
import {Tabs, Icon, Modal} from 'antd';
import './userMng.scss'
const TabPane = Tabs.TabPane;

export default class InnerUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVisible: false,
        }
    }
    addUser() {
        this.refs.addUser.showModel('',{type:"add"})
        // this.setState({
        //     addVisible: true
        // })
    }

    handleOk() {
        this.setState({
            addVisible: false
        })
    }

    render() {
        const {userTodos}=this.props;
        return <div id="innerUser">
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="user" />用户</span>} key="1">

                    <div className="inneruser">
                        <div className="options">
                            <span>选择:____</span>
                            <span>累计：26</span>
                            <Icon type="plus-circle-o" style={{float:"right",cursor:"pointer",fontSize:"larger"}} onClick={this.addUser.bind(this)}/>
                        </div>
                        <User {...this.props} ref="addUser"/>
                    </div>
                </TabPane>
                <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="2">
                    <div className="inneruser">
                        <div className="options">
                            <span>选择:____</span>
                            <span>累计：26</span>
                        </div>
                        <Operation {...this.props}/>
                    </div>

                </TabPane>
            </Tabs>
        </div>
    }
}