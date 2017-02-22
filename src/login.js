/**
 * 登录页面
 */
import React, {Component, PropTypes} from 'react'
import {Form, Icon, Input, Button, Modal} from 'antd'
import 'ASSET/scss/login.scss'
import severRoot from 'CONSTANTS'
const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
    error() {//失败弹出框
        Modal.error({
            title: '提示',
            content: '用户名不存在或密码不匹配',
            okText: "确定"
        })
    },
    handleSubmit(e) {
        e.preventDefault()
        let that = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let sendData = {
                    UPhone:values.UPhone,
                    Credential:hex_md5(values.Credential).substr(8, 16)
                }
            $.post(severRoot+"UserManager/Login",sendData, function (data) {
                    if (data.status === "1000") {
                        that.props.loginIn(data.resultData)
                    } else {
                        that.error()
                    }
                })
            }
        })
    },
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('UPhone', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input addonBefore={<Icon type="user"/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Credential', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem className="submit">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    },
}))
export  default NormalLoginForm;