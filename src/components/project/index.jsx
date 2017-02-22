import React, {Component, PropTypes} from 'react'
import './project.scss'
import {Button, Icon, Tabs, Modal} from 'antd'
import Delivery from './delivery'
import Contract from './contract'
import Receiving from './receiving'
import ProTask from './proTask'
import Ticket from './ticket'
import AddPro from './detail/addPro'
import OptionRecords from './optionRecords'
const ButtonGroup = Button.Group
const TabPane = Tabs.TabPane
const confirm = Modal.confirm
class Project extends Component {
    state = {
        projectList: [
            {
                id: 1001,
                title: "测试工程1",
                state: "已审核",
                date: "2016-8-9 12:45:12",
                checked: false
            }, {
                id: 1020,
                title: "测试工程1",
                state: "已审核",
                date: "2016-8-9 12:45:12",
                checked: true
            }, {
                id: 1005,
                title: "测试工程1",
                state: "已审核",
                date: "2016-8-9 12:45:12",
                checked: false
            },
        ],
        addPro: false
    }

    showConfirm(list) {//提示框
        let that = this
        if (!list.some((item) => item.checked)) {
            Modal.error({
                title: '提示',
                content: '请选择需要删除的工程',
                okText: "确定"
            })
        } else {
            confirm({
                title: '你确定删除所选工程吗?',
                content: '添加不易！删除需谨慎！',
                onOk() {
                    that.deletePro(list)
                },
                onCancel() {
                }
            })
        }
    }

    chooseAll(prolist) {//全选工程
        if (prolist.every((item) => item.checked)) {
            prolist.forEach((item) => item.checked = false)
        } else {
            prolist.forEach((item) => item.checked = true)
        }
        this.setState({})
    }

    deletePro(list) {//删除工程
        let delItem = list.filter((item) => item.checked)//被选中需要删除的项
        let remainItem = list.filter((item) => !item.checked)//未被选中的项
        let delId = [] //需要被删除的项的id
        for (let i in delItem) {
            delId.push(delItem[i].id)
        }
        this.setState({projectList: remainItem})
    }

    changeState() {//传递给子组件来修改父组件state
        this.setState({addPro: !this.state.addPro})
    }

    addPro() {//新增工程
        this.setState({addPro: !this.state.addPro})
    }

    perProChecked(id) {//点击工程被选中
        this.state.projectList.forEach((item) => {
            if (item.id == id) {
                item.checked = !item.checked
            }
        })
        this.setState({})
    }

    render() {
        let project = []
        let proNumber = this.state.projectList.length
        let proList = this.state.projectList
        for (let i = 0; i < proNumber; i++) {
            project.push(<li id={proList[i].id} className={proList[i].checked ? "pro-checked" : ""}
                             onClick={this.perProChecked.bind(this, proList[i].id)}>
                <div className="checked">
                    <Icon type={proList[i].checked ? "check" : ""}/>
                </div>
                <div className="project-detail">
                    <div className="project-head">
                        编号：{proList[i].id} <span>状态</span>
                    </div>
                    <div className="project-name">
                        工程名称： {proList[i].title} <span>{proList[i].state}</span>
                    </div>
                    <div className="project-date">{proList[i].date} 添加</div>
                </div>
            </li>)
        }
        return (
            <div id="project" className="clearfix">
                <AddPro visible={this.state.addPro} changeState={this.changeState.bind(this)}/>
                <div className="project-list left">
                    <ButtonGroup>
                        <Button onClick={this.chooseAll.bind(this, this.state.projectList)}>全选</Button>
                        <Button onClick={this.addPro.bind(this)}>增加</Button>
                        <Button onClick={this.showConfirm.bind(this, this.state.projectList)}>删除</Button>
                    </ButtonGroup>
                    <div className="total">累计：{proNumber}</div>
                    <div className="project-list-content">
                        <ul>
                            {project}
                        </ul>
                    </div>
                </div>
                <nav className="project-nav">
                    <Tabs>
                        <TabPane tab={<span><Icon type="inbox"/>发货单位</span>} key="1">
                            <Delivery/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="menu-fold"/>发货合同</span>} key="2">
                            <Contract/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="menu-unfold"/>收货单位</span>} key="3">
                            <Receiving/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="book"/>任务</span>} key="4">
                            <ProTask/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="tag-o"/>小票</span>} key="5">
                            <Ticket/>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o"/>操作记录</span>} key="6">
                            <OptionRecords/>
                        </TabPane>
                    </Tabs>
                </nav>
            </div>
        )
    }
}
export default Project