/*
 * 修改密码
 * */
import React, {Component, PropTypes} from 'react'
import {Form, Input, Button, Modal} from 'antd'
const FormItem = Form.Item
import severRoot from 'CONSTANTS'
const UpdatePwd = Form.create()(React.createClass({
    success() {//成功弹出框
        Modal.success({
            title: '恭喜',
            content: '密码修改成功',
            okText: "确定"
        });
    },
    error() {//失败弹出框
        Modal.error({
            title: '提示',
            content: '修改失败！请稍后重试',
            okText: "确定"
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let sendData = {
                    UserId:sessionStorage.UserId,
                    OldPWD: hex_md5(values.OldPWD).substr(8, 16),
                    NewPWD: hex_md5(values.NewPWD).substr(8, 16)
                }
                $.post(severRoot + "UserManager/ModifyPassWord", sendData, function (data) {
                    if (data.status === "1000") {
                        that.success()
                    } else {
                        that.error()
                    }
                })
            }
        })
    },
    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('NewPWD')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    },
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="update-form">
                <FormItem>
                    {getFieldDecorator('OldPWD', {
                        rules: [{required: true, message: 'Please input your oldPassword!'}],
                    })(
                        <Input addonBefore="原密码" placeholder="原密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('NewPWD', {
                        rules: [{required: true, message: 'Please input your newPassword!'}],
                    })(
                        <Input addonBefore="新密码" type="password" placeholder="新密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('NewPWDagain', {
                        rules: [
                            {required: true, message: 'Please input your newPassword!'},
                            {
                                validator: this.checkPassword,
                            }],
                    })(
                        <Input addonBefore="确认密码" type="password" placeholder="确认密码"/>
                    )}
                </FormItem>
                <FormItem className="submit">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        修改
                    </Button>
                </FormItem>
            </Form>
        );
    },
}));
export  default UpdatePwd