/*
 * 发货合同详情
 * */
import React, {Component, PropTypes} from 'react'
import Cart from 'COMMON/innerCart'
import {Modal} from 'antd'
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
    render() {
        const cartId = this.props.cartId
        var id = $(cartId).jqGrid('getGridParam', 'selrow')
        return (
            <div>
                <Modal title="发货合同详情" visible={this.props.visible} className="delivery-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="delivery-form contract-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                            <label>签收规则：</label>
                            <select name="rule">
                                <option value="1">自动</option>
                                <option value="2">非自动</option>
                            </select>
                        </div>
                        <div>
                            <label>合同编号：</label><input name="contractNumber" type="text" value="dsadsa"/>
                            <label>合同单位：</label><input name="contractUnit" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>我方联系人：</label><input name="ourLink" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="ourTelphone" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>对方联系人：</label><input name="otherLink" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="otherTelephone" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>开始时间：</label><input name="startDate" type="text" value="dsadsa"/>
                            <label>结束时间：</label><input name="endDate" type="text" value="dsadsa"/>
                        </div>
                        <div className="product">
                            <label>产品：</label>
                            <Cart cartId="pro-inner-cart-list"/>
                        </div>
                        <div>
                            <label>计划数量：</label><input name="deliveryContract" type="text" value="dsadsa"/>
                            <label>已供货数量：</label><input name="sendPerson" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>任务单数：</label><input name="taskNumbers" type="text" value="dsadsa"/>
                            <label>小票数：</label><input name="tickets" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>备注：</label><input name="otherThing" type="text" value="dsadsa"/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}