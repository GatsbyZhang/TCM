/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Checkbox,Button, Modal, Form, Icon, Input, Select, Row, Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class ModalList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userVisible: false,
            showSearch: false
        }
    }
    handleModal() {
      
        this.props.matchingAction.toggleMatching1Model(0);
    }
   
    handleCancel() {
        this.props.matchingAction.closeMatchingModal();
    }

    render() {
      
        var state = this.props.matchingTodos;
        var aDatas = state.userDatas;
        var data = aDatas.filter(item=> {
            return item.id == 1;
        });
        var imgUrl='/static/img/pic.png';
        return <div>
          
            <Modal title="个人信息详情" visible={state.userVisible} width="1200px"
                   onOk={this.handleModal.bind(this)} onCancel={this.handleCancel.bind(this)} okText="保存"
                   cancelText="取消">
                {data.map(function (item) {
                    return <Form key={item.id} style={{width:'100%'}}>
                        <Row>
                            <Col span={4}>
                                <img src={imgUrl} style={{width:150+"px",height:150+"px",margin:'10px 0 0 20px'}}/>
                            </Col>
                            <Col span={20}>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <FormItem label="编号" style={{width:'100%'}}>
                                                <Input defaultValue={item.number}/>
                                            </FormItem>
                                            <FormItem label="注册时间" style={{width:'100%'}}>
                                                <Input defaultValue={item.startDate}/>
                                            </FormItem>
                                            <FormItem label="姓名" style={{width:'100%'}}>
                                                <Input defaultValue={item.user}/>
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
                                                <Input defaultValue={item.hour}/>
                                            </FormItem>
                                            <FormItem label="电话" style={{width:'100%'}}>
                                                <Input defaultValue={item.telNumber}/>
                                            </FormItem>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <FormItem label="第三方登录" style={{width:'100%'}}>
                                            <CheckboxGroup options={[{label:'qq',value:'qq'},{label:'微信',value:'微信'},{label:'微博',value:'微博'}]} defaultValue={['微信']} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem label="角色" style={{width:'50%'}}>
                                            <Select defaultValue={item.role}>
                                                <Option value="创建者">创建者</Option>
                                                <Option value="管理员">管理员</Option>
                                                <Option value="普通用户">普通用户</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row style={{width:'100%'}}>
                                    <Col span={3} >
                                        <div style={{height:180,lineHeight:180,textAlign:'center'}}>驾照</div>
                                    </Col>
                                    <Col span={21}>
                                        <div style={{flex:2,height:180,border:'1px solid black',margin:'0 20px',lineHeight:180,textAlign:'center'}}>驾照</div>
                                    </Col>
                                </Row>
                                <FormItem label="单位名称" style={{width:'50%'}}>
                                    <Input defaultValue={item.company}/>
                                </FormItem>
                                <FormItem label="备注" style={{width:'100%'}}>
                                    <Input defaultValue={item.name}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                }.bind(this))}
            </Modal>
        </div>
    }
}
export  default ModalList2;