/*
 * 新增系统公告组件
 * */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'antd'
import severRoot from 'CONSTANTS'//服务器根目录
export default class AddAnnounce extends Component {
    handleOk() {
        if (!$("#notice-sendContent").val().trim()) {
            this.error("发送内容不能为空！")
        } else {
            const data = {
                Title: $("input#notice-title").val().trim(),
                Content: $("#notice-sendContent").val().trim(),
                MsgSendObj: $("#addnotice-select").val(),
                UserId: sessionStorage.UserId,
            }
            let that = this
            $.post(severRoot + `SysManage/AddSysNotice`, data, function (data) {
                if (data.status === "1000") {
                    that.success()
                    $("input#notice-title").val("")
                    $("#notice-sendContent").val("")
                    $("#addnotice-select").val("0")
                    that.props.indexSysnotice()
                    that.props.changeState()
                } else {
                    that.error("发送失败！")
                }
            })
        }

    }

    handleCancel() {
        this.props.changeState()
    }

    success() {//成功弹出框
        Modal.success({
            title: '恭喜',
            content: '发送成功',
            okText: "确定"
        });
    }

    error(err) {//失败弹出框
        Modal.error({
            title: '提示',
            content: err,
            okText: "确定"
        });
    }

    render() {
        const select = (
            <select id="addnotice-select">
                <option value="0">所有用户</option>
                <option value="1">驾驶员</option>
                <option value="2">发货单位</option>
                <option value="3">收货单位</option>
                <option value="4">租赁单位</option>
            </select>
        )
        return (
            <div>
                <Modal className="add-announce" title="新增系统公告" visible={this.props.visible} okText="发送"
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <div className="send-title">
                        标题：<input id="notice-title" type="text"/>
                    </div>
                    <div className="send-obj">
                        发送对象：{select}
                    </div>
                    <div className="send-text">
                        发送内容：<textarea id="notice-sendContent" cols="60" rows="6"></textarea>
                    </div>
                </Modal>
            </div>
        );
    }
}