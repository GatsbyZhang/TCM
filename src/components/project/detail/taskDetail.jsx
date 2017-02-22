/*
 * 任务单详情
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd';
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
                <Modal title="任务单详情" visible={this.props.visible} className="delivery-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="delivery-form contract-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                            <label>状态：</label>
                            <select name="state">
                                <option value="1">新任务</option>
                                <option value="2">进行中</option>
                            </select>
                        </div>
                        <div>
                            <label>发货单位：</label><input name="sendUnit" type="text" value="dsadsa"/>
                            <label>收货单位：</label><input name="getUnit" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>合同编号：</label><input name="contractNumber" type="text" value="dsadsa"/>
                            <label>工程名称：</label><input name="projectName" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>送货地址：</label><input name="sendAddress" type="text" value="dsadsa"/>
                            <label>浇筑部位：</label><input name="pourPosition" type="text" value="dsadsa"/>
                            <label>浇筑方式：</label><input name="pourStyle" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>计划数量：</label><input name="planNumber" type="text" value="dsadsa"/>
                            <label>已供货数量：</label><input name="hasNumber" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>砼品种：</label><input name="kinds" type="text" value="dsadsa"/>
                            <label>塌落度：</label><input name="slump" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>计划方量：</label><input name="planAmount" type="text" value="dsadsa"/>
                            <label>计划时间：</label><input name="planDate" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>已供方量：</label><input name="hasAmount" type="text" value="dsadsa"/>
                            <label>已供车次：</label><input name="hasCars" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>开始时间：</label><input name="startDate" type="text" value="dsadsa"/>
                            <label>结束时间：</label><input name="endDate" type="text" value="dsadsa"/>
                            <label>用时：</label><input name="usedTime" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>日期：</label><input name="Date" type="text" value="dsadsa"/>
                            <label>签收规则：</label>
                            <select name="rule">
                                <option value="1">自动</option>
                                <option value="2">半自动</option>
                            </select>
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