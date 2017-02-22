/*
 * 合同详情
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import Cart from './innerCart'
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

        return (
            <div>
                <Modal title="详情页面" visible={this.props.visible} className="config-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="config-form">
                        <div>
                            <label>序号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>表名称：</label>
                            <input name="tableName" type="text" disabled="disabled" value="dsadsa"/>
                            <label>表代码：</label>
                            <input name="tableCode" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>数据类型：</label>
                            <input name="dataType" type="text" disabled="disabled" value="dsadsa"/>
                            <label>字段名：</label>
                            <input name="fieldName" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>代码：</label>
                            <input name="code" type="text" disabled="disabled" value="dsadsa"/>
                            <label>长度：</label>
                            <input name="length" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>是否为空：</label>
                            <select name="orNull">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                        <div>
                            <label>是否为日期：</label>
                            <select name="orDate">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                        <div>
                            <label>是否数字：</label>
                            <select name="orNumber">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                        <div>
                            <label>是否选择：</label>
                            <select name="orChoose">
                                <option value="1">是</option>
                                <option value="2">否</option>
                            </select>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}