import React, {Component} from 'react';
import Map from './map.jsx';
import UploadPic from './updatePic.jsx'
import {Button, Modal, Form, Icon, Input, Select, Checkbox, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export  default class AddSendCompany extends Component {
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
            <Modal title="地图选址" visible={sendGoodsTodos.mapMdlVisible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
            >
                <Map {...this.props}/>
            </Modal>
            <Form style={{width:'100%'}}>
                <FormItem label="编号" style={{width:'100%'}}>
                    <Input style={{width:'20%'}}/>
                </FormItem>
                <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                    <FormItem style={{flex:1}} label="单位名称:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1,margin:'0 10px'}} label="联系人:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1}} label="电话:">
                        <Input />
                    </FormItem>
                </Row>
                <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                    <FormItem style={{flex:6}} label="地址:">
                        <Input id="addr"/>
                    </FormItem>
                    <FormItem style={{flex:1,margin:'32px 0 0 20px'}}>
                        <Input defaultValue='经度' id="lng"/>
                    </FormItem>
                    <FormItem style={{flex:1,margin:'32px 0 0 0'}}>
                        <Input defaultValue='纬度' id="lat"/>
                    </FormItem>
                    <FormItem style={{flex:1,margin:'32px 0 0 0'}}>
                        <Icon type="environment" style={{color:"red"}} onClick={this.showModel.bind(this)}/>
                    </FormItem>
                </Row>
                <FormItem label="审核状态">
                    <Select style={{width:'150px'}} defaultValue='未提交'>
                        <Option value="未提交">未提交</Option>
                        <Option value="审核中">审核中</Option>
                        <Option value="已认证">已认证</Option>
                        <Option value="审核不通过">审核不通过</Option>
                    </Select>
                </FormItem>
                <FormItem label="审核资质">
                    <Row>
                        <Col span={8}>
                            <UploadPic text="营业执照" {...this.props}/>
                        </Col>
                        <Col span={8}>
                            <UploadPic text="组织机构代码" {...this.props}/>
                        </Col>
                        <Col span={8}>
                            <UploadPic text="税务登记证" {...this.props}/>
                        </Col>
                    </Row>
                </FormItem>
                <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                    <FormItem style={{flex:1}} label="发货合同数量:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1,margin:'0 10px'}} label="发货单位数:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1}} label="累计方数:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1,margin:'0 10px'}} label="累计车数:">
                        <Input />
                    </FormItem>
                    <FormItem style={{flex:1}} label="任务单号:">
                        <Input />
                    </FormItem>
                </Row>
                <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                    <FormItem style={{flex:1}} label="添加人:">
                        <Input disabled/>
                    </FormItem>
                    <FormItem style={{flex:1,margin:'0 10px'}} label="添加时间:">
                        <Input disabled/>
                    </FormItem>
                </Row>
                <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                    <p style={{flex:1}}>操作人：</p>
                    <p style={{flex:1}}>审核时间：</p>
                    <p style={{flex:1}}>修改创建者：</p>
                    <p style={{flex:1}}>被修改者：</p>
                    <p style={{flex:1}}>电话：</p>
                </Row>
            </Form>

        </div>
    }
}