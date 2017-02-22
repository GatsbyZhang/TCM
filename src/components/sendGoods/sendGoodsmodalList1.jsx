import React, {Component} from 'react';
import {Button, Modal, Form, Icon, Input, Select, Checkbox, Row, Col} from 'antd';
import UploadPic from './updatePic.jsx';
import Address from 'COMMON/address';
const FormItem = Form.Item;
const Option = Select.Option;

class SendGoodsModalList1 extends Component {
    render() {
        var state = this.props.sendGoodsTodos;
        var aDatas = state.datas.rows;
        var data = aDatas.filter(item=> {
            return item.id == state.item;
        });
        return <div>
                {data.map(function (item) {
                    return <Form key={item.id}  style={{width:'100%'}}>
                        <FormItem label="编号" style={{width:'100%'}}>
                            <Input defaultValue={item.number} style={{width:'20%'}}/>
                        </FormItem>
                        <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                            <FormItem style={{flex:1}} label="单位名称:">
                                <Input defaultValue={item.matching}/>
                            </FormItem>
                            <FormItem style={{flex:1,margin:'0 10px'}} label="联系人:">
                               <Input defaultValue={item.name}/>
                            </FormItem>
                            <FormItem style={{flex:1}} label="电话:">
                                <Input defaultValue={item.telNumber}/>
                            </FormItem>
                        </Row>
                        <Row>
                            <Address oDiv="addpro-map" itudeId="addpro-longitude" positionId="addpro-position"/>
                        </Row>
                        <FormItem label="审核状态">
                            <Select style={{width:'150px'}}  defaultValue='未提交'>
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
                                <Input defaultValue={item.aCount}/>
                            </FormItem>
                            <FormItem style={{flex:1,margin:'0 10px'}} label="发货单位数:">
                                <Input defaultValue={item.cCount}/>
                            </FormItem>
                            <FormItem style={{flex:1}} label="累计方数:">
                                <Input defaultValue={item.aFCount}/>
                            </FormItem>
                            <FormItem style={{flex:1,margin:'0 10px'}} label="累计车数:">
                                <Input defaultValue={item.aCount}/>
                            </FormItem>
                            <FormItem style={{flex:1}} label="任务单号:">
                                <Input defaultValue={item.cCount}/>
                            </FormItem>
                        </Row>
                        <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                            <FormItem style={{flex:1}} label="添加人:">
                                <Input defaultValue={item.name} disabled/>
                            </FormItem>
                            <FormItem style={{flex:1,margin:'0 10px'}} label="添加时间:">
                                <Input defaultValue={item.date} disabled/>
                            </FormItem>
                        </Row>
                        <Row style={{width:'100%',display:'flex',flexFlow:'row'}}>
                            <p style={{flex:1}}>操作人：{item.name}</p>
                            <p style={{flex:1}}>审核时间：{item.date}</p>
                            <p style={{flex:1}}>修改创建者：{item.name}</p>
                            <p style={{flex:1}}>被修改者：{item.name}</p>
                            <p style={{flex:1}}>电话：{item.telNumber}</p>
                        </Row>
                    </Form>
                }.bind(this))}
        </div>
    }
}
export  default SendGoodsModalList1;