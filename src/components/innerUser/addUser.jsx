import React from 'react';
import {Form, Input, Select, Button, Icon, Row, Col, Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Search = Input.Search;
export default class AddUser extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

    }

    emitEmpty() {
    }

    render() {
        const {userTodos, actions}=this.props;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return <div style={{width:100+"%",padding:4+"em",margin:"auto"}}>
            <Form onSubmit={this.handleSubmit} >
                <Row type="flex" justify="space-around" gutter={24}>
                    <Col span={8}>
                        <FormItem label="姓名"  {...formItemLayout} >
                            <Input type="text" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="电话"  {...formItemLayout} >
                            <Input type="text" />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="初始密码"  {...formItemLayout} >
                            <Input type="text" defaultValue="888888"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row  type="flex" justify="center">
                    <Col span={4}>
                        <Button type="primary" htmlType="submit">添加</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    }
}