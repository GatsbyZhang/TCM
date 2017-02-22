/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Checkbox, Button, Modal, Form, Icon, Input, Select, Row, Col} from 'antd';
import CompactGrid from './compactGrid.jsx';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class CompactDetailModelList extends Component {
    handleModal() {
        //this.props.actions.toggleMatching1Model(0);
    }

    handleCancel() {
        this.props.actions.closeCompactDetailModelList();
    }

    render() {
        let state = this.props.sendGoodsTodos;
        let aDatas = state.compactData.rows;
        let data = aDatas.filter(item=> {
            return item.id == state.compactId;
        });
        var imgUrl = '/static/img/pic.png';
        return <div>
            <Modal title="合同详情" visible={state.compactVisible} width="1200px"
                   onOk={this.handleModal.bind(this)} onCancel={this.handleCancel.bind(this)} okText="保存"
                   cancelText="取消">
                {data.map(function (item) {
                    return <Form key={item.id} style={{width:'100%'}}>
                        <Row>
                            <Col span={12}>
                                <FormItem label="编号" style={{width:'60%'}}>
                                    <Input defaultValue={item.id}/>
                                </FormItem>
                                <FormItem label="合同编号" style={{width:'60%'}}>
                                    <Input defaultValue={item.number}/>
                                </FormItem>
                                <FormItem label="我方联系人" style={{width:'60%'}}>
                                    <Input defaultValue={item.name}/>
                                </FormItem>
                                <FormItem label="对方联系人" style={{width:'60%'}}>
                                    <Input defaultValue={item.name}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                    <FormItem label="签收规则" style={{width:'60%'}}>
                                        <Select defaultValue={item.rule}>
                                            <Option value="签收">签收</Option>
                                            <Option value="代签">代签</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="合同单位" style={{width:'60%'}}>
                                        <Input defaultValue={item.matching}/>
                                    </FormItem>
                                    <FormItem label="电话" style={{width:'60%'}}>
                                        <Input defaultValue={item.telNumber}/>
                                    </FormItem>
                                    <FormItem label="电话" style={{width:'60%'}}>
                                        <Input defaultValue={item.telNumber}/>
                                    </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <FormItem label="产品" >
                                <CompactGrid {...this.props} />
                            </FormItem>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem label="计划数量" style={{width:'60%'}}>
                                    <Input defaultValue={item.cCount}/>
                                </FormItem>
                                <FormItem label="任务单数" style={{width:'60%'}}>
                                    <Input defaultValue={item.aCount}/>
                                </FormItem>
                                <FormItem label="备注" style={{width:'60%'}}>
                                    <Input defaultValue={item.message}/>
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="已供货数量" style={{width:'60%'}}>
                                    <Input defaultValue={item.aFCount}/>
                                </FormItem>
                                <FormItem label="小票数" style={{width:'60%'}}>
                                    <Input defaultValue={item.cCount}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    }.bind(this))}
            </Modal>
        </div>
    }
}
export  default CompactDetailModelList;