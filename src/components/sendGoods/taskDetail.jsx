/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Checkbox, Button, Modal, Form, Icon, Input, Select, Row, Col} from 'antd';
import CompactGrid from './compactGrid.jsx';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class TaskDetail extends Component {
    handleModal() {
        //this.props.actions.toggleMatching1Model(0);
    }

    handleCancel() {
        this.props.actions.closeTaskDetailModelList();
    }

    render() {
        let state = this.props.sendGoodsTodos;
        let aDatas = state.compactData.rows;
        let data = aDatas.filter(item=> {
            return item.id == state.taskId;
        });
        return <div>
            <Modal title="任务详情" visible={state.taskVisible} width="1200px"
                   onOk={this.handleModal.bind(this)} onCancel={this.handleCancel.bind(this)} okText="保存"
                   cancelText="取消">
                {data.map(function (item) {
                    return <Form key={item.id} style={{width:'100%'}}>
                        <Row>
                            <Col span={12}>
                                <FormItem label="编号" style={{width:'60%'}}>
                                    <Input defaultValue={item.id}/>
                                </FormItem>
                                <FormItem label="发货单位" style={{width:'60%'}}>
                                    <Input defaultValue={item.takeGoods}/>
                                </FormItem>
                                <FormItem label="合同编号" style={{width:'60%'}}>
                                    <Input defaultValue={item.number}/>
                                </FormItem>
                                <FormItem label="送货地址" style={{width:'60%'}}>
                                    <Input defaultValue={item.matching}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="状态" style={{width:'60%'}}>
                                    <Select defaultValue='新任务'>
                                        <Option value="新任务">新任务</Option>
                                        <Option value="进行中">进行中</Option>
                                        <Option value="已完成">已完成</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="收货单位" style={{width:'60%'}}>
                                    <Input defaultValue={item.matching}/>
                                </FormItem>
                                <FormItem label="工程名称" style={{width:'60%'}}>
                                    <Input defaultValue={item.tableName}/>
                                </FormItem>
                                <Row>
                                    <FormItem label="浇筑部位" style={{width:'40%'}}>
                                        <Input defaultValue={item.part}/>
                                    </FormItem>
                                    <FormItem label="浇筑方式" style={{width:'40%'}}>
                                        <Input defaultValue={item.style}/>
                                    </FormItem>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}>
                                <FormItem label="砼品种" >
                                    <Input defaultValue={item.style} style={{width:'90%'}}/>
                                </FormItem>
                            </Col>
                            <Col span={5}>
                            <FormItem label="塌落度" >
                                <Input defaultValue={item.aCount} style={{width:'90%'}}/>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem label="计划方量" style={{width:'80%'}}>
                                    <Input defaultValue={item.cCount}/>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="计划时间" style={{width:'80%'}}>
                                    <Input defaultValue={item.hour}/>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="已供方量" style={{width:'80%'}}>
                                    <Input defaultValue={item.cCount}/>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="已供车次" style={{width:'80%'}}>
                                    <Input defaultValue={item.aFCount}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem label="开始时间" style={{width:'80%'}}>
                                    <Input defaultValue={item.startDate}/>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="结束时间" style={{width:'80%'}}>
                                    <Input defaultValue={item.endDate}/>
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem label="用时" style={{width:'80%'}}>
                                    <Input defaultValue={item.hour}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <FormItem label="签收规则" style={{width:'80%'}}>
                                    <Select defaultValue={item.rule}>
                                        <Option value="签收">签收</Option>
                                        <Option value="代签">代签</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="备注" >
                                    <Input placeHolder="输入特殊需求" defaultValue={item.message}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                }.bind(this))}
            </Modal>
        </div>
    }
}
export  default TaskDetail;