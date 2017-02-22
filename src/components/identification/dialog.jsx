/*
 * 弹出摸态框
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import Address from 'COMMON/address'
export default class Dialog extends Component {
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

    render() {
        return (
            <div>
                <Modal title="用户详情" visible={this.props.visible} className="iden-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="iden-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>单位名称：</label><input name="company" type="text" value="dsadsa"/>
                            <label>提交人：</label><input name="sendPerson" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="telphone" type="text" value="dsadsa"/>
                        </div>
                        <Address oDiv="iden-map" itudeId="iden-longitude" positionId="iden-position"/>
                        <div>
                            <label>审核状态：</label>
                            <select name="state">
                                <option value="1">未提交</option>
                                <option value="2">审核中</option>
                                <option value="3">已认证</option>
                                <option value="4">审核不通过</option>
                            </select>
                        </div>
                        <div className="examine">
                            <label>审核资质：</label>
                            <div>
                                <img src="/static/img/error.jpg"/>
                                营业执照
                            </div>
                            <div>
                                <img src="/static/img/error.jpg"/>
                                组织机构代码证
                            </div>
                            <div>
                                <img src="/static/img/error.jpg"/>
                                税务登记证
                            </div>
                        </div>
                    </form>
                    <div className="operate">
                        <ul>
                            <li>操作人：<span>1312423</span></li>
                            <li>审核时间：<span>1312423</span></li>
                            <li>修改创建者：<span>1312423</span></li>
                            <li>被修改者：<span>1312423</span></li>
                            <li>电话：<span>1312423</span></li>
                        </ul>
                    </div>
                </Modal>
            </div>
        )
    }

}