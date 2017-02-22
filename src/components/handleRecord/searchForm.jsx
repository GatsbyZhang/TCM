/**
 * Created by SWSD on 2017-01-04.
 */
import React from 'react'
import {Form, Row, Col, Input, Button, Icon, Select,DatePicker } from 'antd';
import './handle.scss'
const FormItem = Form.Item;
const Option = Select.Option;
const {  RangePicker } = DatePicker;
export default class SearchForm extends React.Component {

    render() {
        return <div id="search-form">
            <Form inline
                  className="ant-advanced-search-form"
            >
                <Row gutter={24}>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <FormItem label="选择时间">
                            <RangePicker  />
                        </FormItem>
                    </Col>
                    <Col span={6} style={{ textAlign: 'center' }}>
                        <FormItem label="操作人">
                            <Select defaultValue="张三">
                                <Option value="张三">张三</Option>
                                <Option value="李四">李四</Option>
                                <Option value="王五">王五</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Col>
                </Row>
            </Form>
        </div>

    }
}