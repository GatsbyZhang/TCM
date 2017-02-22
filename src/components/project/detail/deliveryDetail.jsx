/*
 * 发货单位详情
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import Address from 'COMMON/address'
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
        var row = $(cartId).jqGrid('getRowData', id);
        return (
            <div>
                <Modal title="发货单位详情" visible={this.props.visible} className="delivery-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="delivery-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>单位名称：</label><input name="company" type="text" value="dsadsa"/>
                            <label>提交人：</label><input name="sendPerson" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="telphone" type="text" value="dsadsa"/>
                        </div>
                        <Address oDiv="delivery-map" itudeId="delivery-longitude" positionId="delivery-position"/>
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
                        <div>
                            <label>发货合同数：</label><input name="deliveryContract" type="text" value="dsadsa"/>
                            <label>收货单位数：</label><input name="sendUnits" type="text" value="dsadsa"/>
                            <label>租赁合同数：</label><input name="rentContracts" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>累计方数：</label><input name="carsNumber" type="text" value="dsadsa"/>
                            <label>累计车数：</label><input name="cumNumber" type="text" value="dsadsa"/>
                            <label>租赁单位数：</label><input name="rentUnits" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>任务单数：</label><input name="taskNumber" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>添加人：</label><input disabled="disabled" name="adder" type="text" value="dsadsa"/>
                            <label>添加时间：</label><input disabled="disabled" name="addDate" type="text" value="dsadsa"/>
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