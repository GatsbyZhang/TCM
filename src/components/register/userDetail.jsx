/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Checkbox, Button, Modal, Form, Icon, Input, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class RegisterModalList extends Component {

    render() {
        let state =this.props.registerTodos;

        let data;
        if(state.userDatas){
            data = state.userDatas.user;
        }else{
            data = {};
        }
        let role=data.URoleCode==0?'创建者':(data.URoleCode==1?'普通用户':'管理员');
        return <div>
            <Modal title="个人详情" visible={this.props.visible} width="1200px"
                   onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                   okText={this.props.type=='add'?"新增":"修改"}
                   cancelText="取消">
                <Form key={data.UserId} style={{width:'100%'}} id="frm-reg-detail">
                    <Row>
                        <Col span={4}>
                            <img src={data.UDriveImg} style={{width:150+"px",height:150+"px",margin:'10px 0 0 20px'}}/>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <FormItem label="编号" style={{width:'100%'}}>
                                            <Input defaultValue={data.UPhone}/>
                                        </FormItem>
                                        <FormItem label="注册时间" style={{width:'100%'}}>
                                            <Input defaultValue={data.RegisterTimeStamp}/>
                                        </FormItem>
                                        <FormItem label="姓名" style={{width:'100%'}}>
                                            <Input defaultValue={data.UName}/>
                                        </FormItem>
                                    </Row>
                                </Col>
                                <Col span={15} style={{margin:'0 0 0 10px'}}>
                                    <Row>
                                        <FormItem label="状态" style={{width:'50%'}}>
                                            <Select defaultValue='已认证'>
                                                <Option value="未提交">未提交</Option>
                                                <Option value="审核中">审核中</Option>
                                                <Option value="已认证">已认证</Option>
                                                <Option value="审核不通过">审核不通过</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="在线时长" style={{width:'100%'}}>
                                            <Input defaultValue={data.OnlineTime}/>
                                        </FormItem>
                                        <FormItem label="电话" style={{width:'100%'}}>
                                            <Input defaultValue={data.UPhone}/>
                                        </FormItem>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem label="第三方登录" style={{width:'100%'}}>
                                        <CheckboxGroup
                                            options={[{label:'qq',value:'qq'},{label:'微信',value:'微信'},{label:'微博',value:'微博'}]}
                                            defaultValue={['微信']}/>
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem label="角色" style={{width:'50%'}}>
                                        <Select defaultValue={role}>
                                            <Option value="创建者">创建者</Option>
                                            <Option value="管理员">管理员</Option>
                                            <Option value="普通用户">普通用户</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row style={{width:'100%'}}>
                                <Col span={3}>
                                    <div style={{height:180,lineHeight:180,textAlign:'center'}}>驾照</div>
                                </Col>
                                <Col span={21}>
                                    <div
                                        style={{flex:2,height:180,border:'1px solid black',margin:'0 20px',lineHeight:180,textAlign:'center'}}>
                                        驾照
                                    </div>
                                </Col>
                            </Row>
                            <FormItem label="单位名称" style={{width:'50%'}}>
                                <Input defaultValue={data.UnitName}/>
                            </FormItem>
                            <FormItem label="备注" style={{width:'100%'}}>
                                <Input defaultValue="备注"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                </Modal>
        </div>
    }
}
export  default RegisterModalList;