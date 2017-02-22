import React, {Component} from 'react';
import Map from './map.jsx';
import ConfigList from './configList.jsx'
import {Button, Modal, Form, Switch , Input, Select, InputNumber, Row, Col,Layout} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

export  default class SendConfigDetail extends Component {
    handleOk() {

        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(false);
    }

    handleCancel() {

        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(false);
    }

    showModel() {
        const {actions, sendGoodsTodos}=this.props;
        actions.toggleMapModel(!sendGoodsTodos.mapMdlVisible);
    }

    render() {
        var state = this.props.sendGoodsTodos;
        const {sendGoodsTodos}=this.props;
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 14},
        };
        var aDatas = state.datas.rows;
        var data = aDatas.filter(item=> {
            return item.id == state.item;
        });
        return <div>
            <Modal title="后台配置" visible={sendGoodsTodos.mapMdlVisible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
            >
                <Map {...this.props}/>
            </Modal>
            <Form style={{width:'100%'}}>
                <Row type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="单位名称:" {...formItemLayout}>
                            <Input />
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem label="联系人:" {...formItemLayout}>
                            <Input />
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem label="电话:" {...formItemLayout}>
                            <Input />
                        </FormItem>
                    </Col>


                </Row>
                <Row type="flex" justify="start" gutter={24}>
                    <Col span={8}>
                        <FormItem label="状态" {...formItemLayout}>
                            <Select defaultValue='启用'>
                                <Option value="启用">启用</Option>
                                <Option value="停用">停用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="数据库类型:" {...formItemLayout}>
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="自动备份:" {...formItemLayout}>
                            <Switch defaultChecked={true} />
                        </FormItem>
                    </Col>

                </Row>

                <Row type="flex" justify="start" gutter={24}>
                    <Col span={8} style={{borderRight:"dashed 1px #ddd"}}>
                        <Layout>
                            <Header style={{textAlign:"center",margin:"2em auto"}}><h3>砼车数据库</h3></Header>
                            <Content>
                                <FormItem label="砼车数据库表名:" {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Content>
                        </Layout>
                    </Col>
                    <Col span={8} style={{borderRight:"dashed 1px #ddd"}}>
                        <Layout>
                            <Header style={{textAlign:"center",margin:"2em auto"}}><h3>ERP数据表</h3></Header>
                            <Content>
                                <FormItem label="数据库名称:" {...formItemLayout}>
                                    <Input />
                                </FormItem>
                                <FormItem label="用户名:" {...formItemLayout}>
                                    <Input />
                                </FormItem>
                                <FormItem label="密码:" {...formItemLayout}>
                                    <Input />
                                </FormItem>
                            </Content>
                        </Layout>
                    </Col>
                    <Col span={8}>
                        <Layout>
                            <Header style={{textAlign:"center",margin:"2em auto"}}><h3>同步配置</h3></Header>
                            <Content>
                                <FormItem label="采集数据间隔:" {...formItemLayout}>
                                    <InputNumber min={1} max={10} defaultValue={3} />
                                </FormItem>
                            </Content>
                        </Layout>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <ConfigList {...this.props}/>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={4}>
                        <Button type="primary">保存</Button>
                    </Col>
                    <Col span={4}>
                        <Button>打印</Button>
                    </Col>
                </Row>
            </Form>

        </div>
    }
}