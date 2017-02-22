import React from 'react';
import {Form, Input, Select, Button, Icon, Row, Col, Radio} from 'antd';
const FormItem = Form.Item;

import UpdatePic from './updatePic.jsx'
export default class Brkdwndetail extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

    }

    searchSth() {
        alert("You are search something @@");
    }

    emitEmpty() {

    }

    render() {
        const {carMngTodos, actions}=this.props;
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 14},
        };
        const formItemLayout1 = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const {brkDetail, carsDetail}=carMngTodos;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let detail = carsDetail;

        //todo:input defaultValue设置值失败（现用value显示，但是无法修改），待解决
        const suffix = detail.company ? '<Icon type="close-circle" onClick={this.emitEmpty} />' : <Icon type="search"/>;
        if (carMngTodos.loadingCarsItem) {
            return <div style={{margin:"auto"}}>
                读取中...
            </div>
        }
        return <div style={{width:100+"%",padding:4+"em",margin:"auto"}}>
            <Form onSubmit={this.handleSubmit}>
                <h2>当前ID——{carMngTodos.brkDetailId}</h2>
                <Row gutter={24} type="flex" justify="center">
                    <Col span={20}>
                        <FormItem label="车辆照片" {...formItemLayout1}>
                            <input type="image" src={detail.carPic}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="start">
                    <Col span={10}>
                        <FormItem label="车牌"  {...formItemLayout}>
                            <Input type="text" defaultValue={detail.carCard}/>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem label="车号"  {...formItemLayout}>
                            <Input type="text" defaultValue={detail.carId}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="start">
                    <Col span={10}>
                        <FormItem label="所属单位" {...formItemLayout}>
                            <Input type="text" defaultValue={detail.company}/>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem label="驾驶员" {...formItemLayout}>
                            <Input type="text" defaultValue="贵顺"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="start">
                    <Col span={10}>
                        <FormItem label="规格" {...formItemLayout}>
                            <Input type="text" defaultValue={detail.spec}/>
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem label="品牌" {...formItemLayout}>
                            <Input type="text" defaultValue={detail.brand}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24} type="flex" justify="start">
                    <Col span={10} style={{ textAlign: 'left' }}>
                        <FormItem label="故障类型" {...formItemLayout}>
                            <Input type="text" defaultValue={detail.brkType}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col span={20} style={{ textAlign: 'left' }}>
                        <FormItem label="故障描述" {...formItemLayout1}>
                            <Input type="textarea" defaultValue="故障描述故障面包似乎不打就三个地方几乎是购房款计划v"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col span={10} style={{ textAlign: 'left' }}>
                        <FormItem label="故障照片" {...formItemLayout}>
                            <UpdatePic/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    }
}