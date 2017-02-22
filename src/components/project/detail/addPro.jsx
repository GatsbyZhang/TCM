/*
 * 添加工程
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import Address from 'COMMON/address'
export default class Detail extends Component {
    handleOk() {
        this.props.changeState()
    }

    handleCancel() {
        this.props.changeState()
    }

    render() {
        return (
            <div>
                <Modal title="工程详情" visible={this.props.visible} className="addpro-dialog"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <form action="###" className="addpro-form">
                        <div>
                            <label>编号：</label>
                            <input name="id" type="text" disabled="disabled" value="dsadsa"/>
                        </div>
                        <div>
                            <label>工程名称：</label><input name="projectName" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>联系人：</label><input name="linkMan" type="text" value="dsadsa"/>
                            <label>电话：</label><input name="telephone" type="text" value="dsadsa"/>
                        </div>
                        <Address oDiv="addpro-map" itudeId="addpro-longitude" positionId="addpro-position"/>
                        <div>
                            <label>发货合同数：</label><input name="deliveryContract" type="text" value="dsadsa"/>
                            <label>收货单位数：</label><input name="sendUnits" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>累计方数：</label><input name="carsNumber" type="text" value="dsadsa"/>
                            <label>累计车数：</label><input name="cumNumber" type="text" value="dsadsa"/>
                            <label>任务单数：</label><input name="taskAmount" type="text" value="dsadsa"/>
                        </div>
                        <div>
                            <label>添加人：</label><input disabled="disabled" name="adder" type="text" value="dsadsa"/>
                            <label>添加时间：</label><input disabled="disabled" name="addDate" type="text" value="dsadsa"/>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }

}