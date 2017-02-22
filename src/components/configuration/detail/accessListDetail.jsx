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
                            <label>单位名称：</label>
                            <input name="unitName" type="text" disabled="disabled" value="dsadsa"/>
                            <label>联系人：</label>
                            <input name="linkMan" type="text" disabled="disabled" value="dsadsa"/>
                            <label>电话：</label>
                            <input name="telephone" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>状态：</label>
                            <select name="state">
                                <option value="1">启动</option>
                                <option value="2">停用</option>
                            </select>
                        </div>
                        <div className="tong-data-base">
                            <div>
                                <div>
                                    砼车数据库
                                </div>
                                <div className="data-name">
                                    <label>数据库表名：</label>
                                    <input name="tableName" type="text" disabled="disabled" value="dsadsa"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    erp数据表
                                </div>
                                <div  className="data-name">
                                    <label>数据库名称：</label>
                                    <input name="dataName" type="text" value="dsadsa"/>
                                </div>
                                <div  className="data-name">
                                    <label>用户名：</label>
                                    <input name="username" type="text" value="dsadsa"/>
                                </div>
                                <div className="data-name">
                                    <label>密码：</label>
                                    <input name="password" type="text" value="dsadsa"/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    同步配置
                                </div>
                                <div className="data-name">
                                    <label>采集数据间隔：</label>
                                    <input type="number" name="points" min="2" max="10" step="1" placeholder="3"/>
                                </div>
                            </div>
                        </div>
                        <div className="product">
                            <label>接入设置：</label>
                            <Cart cartId='access-cart-list'/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}