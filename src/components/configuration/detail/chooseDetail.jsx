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
                            <label>名称：</label>
                            <input name="tableName" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>被选择项数：</label>
                            <input name="dataType" type="number"  placeholder="1"/>
                        </div>
                        <div>
                            <label>字段名：</label>
                            <input name="code" type="text"  value="dsadsa"/>
                        </div>
                        <div className="input-long">
                            <label>生效时间：</label>
                            <input name="code" type="date"/>
                        </div>
                        <div className="input-long">
                            <label>备注：</label>
                            <input name="code" type="text" value="dsadsa"/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}