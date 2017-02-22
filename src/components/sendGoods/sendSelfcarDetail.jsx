import React, {Component} from 'react';
import Map from './map.jsx';
import UploadPic from './updatePic.jsx'
import {Button, Modal, Form, Icon, Input, Select, Checkbox, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export  default class SendSelfcarDetail extends Component {
    handleOk() {

        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(false);
    }

    handleCancel() {

        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(false);
    }

    showModel() {
        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(!sendGoodsTodos.mapMdlVisible);
    }

    render() {
        var state = this.props.sendGoodsTodos;
        const {sendGoodsTodos}=this.props;
        var aDatas = state.datas.rows;
        var data = aDatas.filter(item=> {
            return item.id == state.item;
        });
        return <div>
            <Modal title="自有车辆" visible={sendGoodsTodos.mapMdlVisible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
            >
                <Map {...this.props}/>
            </Modal>
            <Form style={{width:'100%'}}>
                <Row type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="单位名称:">
                            <Input />
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem  label="联系人:">
                            <Input />
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem label="电话:">
                            <Input />
                        </FormItem>
                    </Col>


                </Row>
                <Row type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="状态">
                            <Select defaultValue='启用'>
                                <Option value="启用">启用</Option>
                                <Option value="停用">停用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row  type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="数据库类型:">
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="支持自动备份:">
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="砼车数据库表名:">
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row  type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="ERP数据库名称:">
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="用户名:">
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="密码:">
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
                <Row  type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="同步配置（设置采集数据间隔）:">
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="列表:">
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
            </Form>

        </div>
    }
}