/*
 * 驾驶员详情
 * */
import React, {Component, PropTypes} from 'react'
import {Modal,Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;
export default class Detail extends Component {
    handleOk() {
        this.props.changeState({
            visible: false
        })
    }

    handleCancel() {
        this.props.changeState({
            visible: false
        })
    }
    onChange(e){
        console.log(e)
    }
    render() {
        const cartId = this.props.cartId
        var id = $(cartId).jqGrid('getGridParam', 'selrow')
        var row = $(cartId).jqGrid('getRowData', id);
        return (
            <div>
                <Modal title="详情页面" visible={this.props.visible} className="driver-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <div className="head-img">
                        <img src="/static/img/error.jpg"/>
                    </div>
                    <form action="###" className="driver-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                            <label>状态：</label>
                            <select name="state">
                                <option value="1">未提交</option>
                                <option value="2">审核中</option>
                                <option value="3">已认证</option>
                                <option value="4">审核不通过</option>
                            </select>
                        </div>
                        <div>
                            <label>注册时间：</label><input name="registerTime" type="text" value="dsadsa"/>
                            <label>在线时长：</label><input name="totalOnline" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>姓名：</label><input name="name" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="telephone" type="text" value="dsadsa"/>
                        </div>
                        <div className="other-login">
                            <label>第三方登录：</label>
                            <CheckboxGroup onChange={this.onChange.bind(this)}
                                options={[{label:'qq',value:'qq'},{label:'微信',value:'微信'},{label:'微博',value:'微博'}]}
                                defaultValue={['微信']}/>
                        </div>
                        <div>
                            <label>角色：</label>
                            <select name="role">
                                <option value="1">创建者</option>
                                <option value="2">管理员</option>
                                <option value="3">普通用户</option>
                            </select>
                        </div>
                        <div className="examine">
                            <label>审核资质：</label>
                            <div>
                                <img src="/static/img/error.jpg"/>
                                驾照
                            </div>
                        </div>
                        <div className="input-long">
                            <label>单位名称：</label><input name="unitName" type="text" value="dsadsa"/>
                        </div>
                        <div className="input-long">
                            <label>备注：</label><input name="otherThing" type="text" value="dsadsa"/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}