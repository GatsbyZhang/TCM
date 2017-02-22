import React from 'react';
import {Icon, Row, Col, Form, Input, Button, DatePicker, Select, Modal} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const AdvancedSearch = Form.create()(React.createClass({
    advancedSearch() {
        this.props.changeSearch()
    },
    notify(content){
        Modal.error({
            title: '提示',
            content: `没有搜到相关${content}信息`,
            okText: "确定"
        });
    },
    handleSubmit(e) {
        e.preventDefault();
        const {actions, searchTodos, sendGoodsTodos}=this.props;
        const companyItems = sendGoodsTodos.datas.rows;
        const carsItems = searchTodos.carsItems;
        const taskItems = sendGoodsTodos.compactData.rows;
        let flag=false;
        this.props.form.validateFields((err, values) => {
            //高级搜索中有“单位名称”则优先跳转至单位详情，否则跳转至其他搜索结果
            if (values.Company) {

                companyItems.map(item=> {
                    if (item.matching == values.Company) {
                        flag=true;
                        this.advancedSearch();
                        actions.clickListMenu('SendGoods');
                        //搜索显示高亮
                        actions.hightlightCmp(values.Company);
                    }
                });
                if(!flag){
                   this.notify("单位")
                }
            }
            else {
                if (values.Task) {
                    taskItems.map(item=> {
                        if (item.number == values.Task) {
                            flag=true;
                            this.props.changeSearch();
                            this.advancedSearch();
                            actions.clickListMenu('SendGoods');
                            actions.setTab('6');
                            //搜索显示高亮
                            actions.hightlightCmp(item.number, item.number);
                        }
                    });
                    if(!flag){
                        this.notify("任务")
                    }
                }
                else if (values.CarID) {
                    carsItems.map(item=> {
                        if (item.carId == values.CarID) {
                            flag=true;
                            this.props.changeSearch();
                            actions.clickListMenu('CarsManagement');
                            //搜索显示高亮
                            actions.hightlightCmp(item.carId, item.id);
                        }
                    });
                    if(!flag){
                        this.notify("车辆")
                    }
                }
                else if (values.ReceiptID) {
                    taskItems.map(item=> {
                        if (item.number == values.ReceiptID) {
                            flag=true;
                            this.props.changeSearch();
                            actions.clickListMenu('SendGoods');
                            actions.setTab('7');
                            //搜索显示高亮
                            actions.hightlightCmp(item.number, item.number);
                        }
                    });
                    if(!flag){
                        this.notify("小票")
                    }
                }
                else if (values.CompactID) {
                    taskItems.map(item=> {
                        if (item.number == values.CompactID) {
                            flag=true;
                            this.props.changeSearch();
                            actions.clickListMenu('SendGoods');
                            actions.setTab('2');
                            //搜索显示高亮
                            actions.hightlightCmp(item.number, item.number);
                        }
                    });
                    if(!flag){
                        this.notify("合同")
                    }
                }
                else if (values.Project) {
                    //    todo:等待相关数据
                }
                else if (values.Driver) {
                    //    todo:等待相关数据
                }
                else if (values.Tel) {
                    //    todo:等待相关数据
                }
                else if (values.Name) {
                    //    todo:等待相关数据
                }
                else if (values.Driver) {

                }
            }
        })
    },
    componentDidMout(){
        const {actions}=this.props;
        actions.fetchCarItems();
    },
    render() {
        const {getFieldDecorator} = this.props.form;
        return <div id="advanced-search" style={{ width:"80%",margin:"2em auto"}}>
            <Form onSubmit={this.handleSubmit} className="search-form">
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="开始时间">
                            {getFieldDecorator('BeginTime', {})(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem label="单位名称">
                            {getFieldDecorator('Company', {})(
                                <Input addonBefore={<Icon type="menu-unfold"/>} type="text" placeholder="可搜"/>
                            )}
                        </FormItem>
                        <FormItem label="手机号">
                            {getFieldDecorator('Tel', {})(
                                <Input addonBefore={<Icon type="lock"/>} type="text"/>
                            )}
                        </FormItem>
                        <FormItem label="合同编号">
                            {getFieldDecorator('CompactID', {})(
                                <Input addonBefore={<Icon type="pay-circle-o"/>} type="text" placeholder="可搜"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="结束时间">
                            {getFieldDecorator('EndTime', {})(
                                <DatePicker  />
                            )}
                        </FormItem>
                        <FormItem label="工程名称">
                            {getFieldDecorator('Project', {})(
                                <Input addonBefore={<Icon type="folder"/>} type="text"/>
                            )}
                        </FormItem>
                        <FormItem label="姓名">
                            {getFieldDecorator('Name', {})(
                                <Input addonBefore={<Icon type="user"/>} type="text"/>
                            )}
                        </FormItem>
                        <FormItem label="任务单编号">
                            {getFieldDecorator('Task', {})(
                                <Input addonBefore={<Icon type="book"/>} type="text" placeholder="可搜"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="地区">
                            {getFieldDecorator('Region', {})(
                                <Select defaultValue="上海" style={{ width: 120 }}>
                                    <Option value="上海">上海</Option>
                                    <Option value="苏州">苏州</Option>
                                    <Option value="南京">南京</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="驾驶员">
                            {getFieldDecorator('Driver', {})(
                                <Input addonBefore={<Icon type="team"/>} type="text"/>
                            )}
                        </FormItem>
                        <FormItem label="车牌号">
                            {getFieldDecorator('CarID', {})(
                                <Input addonBefore={<Icon type="exception"/>} type="text" placeholder="可搜"/>
                            )}
                        </FormItem>
                        <FormItem label="小票编号">
                            {getFieldDecorator('ReceiptID', {})(
                                <Input addonBefore={<Icon type="pushpin-o"/>} type="text" placeholder="可搜"/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col>
                        <FormItem>

                        </FormItem>
                        <FormItem >
                            <Button onClick={this.props.changeSearch} style={{marginRight:"1em"}}>
                                返回
                            </Button>
                            <Button type="primary" htmlType="submit" className="search-form-button">
                                查询
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    }
}));
export  default AdvancedSearch;