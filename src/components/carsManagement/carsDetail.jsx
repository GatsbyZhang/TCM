import React from 'react';
import {Form, Input, Select, Button, Icon, Row, Col, Radio, Modal, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const confirm = Modal.confirm;
import CarsStateInput from './carsStateInput.jsx'
import IdentStateInput from './identStateInput.jsx'
const detail = Form.create()(React.createClass({
    getInitialState() {
        return {
            visible: false,
        };
    },
    handleSubmit(e) {
        e.preventDefault();

    },

    searchSth(e) {
        alert("You are search something @@" + e.target.value);
        const {carMngTodos, actions}=this.props;
        this.setState({
            visible:!this.state.visible
        })
    },

    changeSearch(e) {
        this.props.actions.searchCompany(e.target.value);
    },

    emitEmpty() {
        this.props.actions.searchCompany('');
    },

    unbindDrv(id) {
        let driver = id == 1 ? "驾驶员1" : (id == 2 ? "驾驶员2" : "驾驶员3");
        confirm({
            title: '提示',
            content: `确定将${driver}与车辆解除绑定吗？`,
            onOk() {
                message.success('已成功解绑');
            },
            onCancel() {
            },
        });
    },

    render() {
        const { getFieldDecorator } = this.props.form;
        const {carMngTodos, actions}=this.props;
        const {carsDetail}=carMngTodos;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const radioStyle = {
            display: 'inline-block',
            height: '30px',
            lineHeight: '30px'
        };
        let detail = carsDetail;

        const suffix = carMngTodos.searchCmp ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)}/> : null;

        if (carMngTodos.loadingCarsItem) {
            return <div>
                读取中...
            </div>
        }
        return <div style={{width:100+"%",padding:4+"em",margin:"auto"}}>
            <Form onSubmit={this.handleSubmit} inline>
                <h2>当前ID——{carMngTodos.detailId}</h2>
                <Row gutter={24} style={{marginBottom:1+"em"}}>
                    <Col span={12} style={{textAlign:"center"}}>
                        <FormItem label="车辆照片">
                            <input type="image" src={detail.carPic}/>
                        </FormItem>
                    </Col>
                    <Col span={12} style={{textAlign:"center"}}>
                        <FormItem label="行驶证">
                            <input type="image" src={detail.drvPic}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="编号">
                            <Input type="text" value={detail.id}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="车辆状态" wrapperCol={12}>
                            <CarsStateInput actions={actions} carsDetail={detail} carMngTodos={carMngTodos}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="认证状态" wrapperCol={12}>
                            <IdentStateInput actions={actions} carsDetail={detail} carMngTodos={carMngTodos}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="车牌">
                            <Input defaultValue={detail.carCard}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="规格">
                            <Input defaultValue={detail.spec}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="车号">
                            <Input defaultValue={detail.carId}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="品牌">
                            <Input defaultValue={detail.brand}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="所属单位" labelCol={4} wrapperCol={14}>
                            {
                                //todo:解绑所属单位：点击所属单位右侧【X】按钮，即可清空单位信息。
                                //todo：重新绑定所属单位：点击所属单位右侧搜索按钮，进入搜索页，输入单位名称，从列表中选择单位即可填充所属单位。
                            }
                            <Input defaultValue={detail.company}
                                   suffix={suffix}
                                   placeholder="请输入搜索单位..."
                                   onPressEnter={this.searchSth.bind(this)}
                                   onChange={this.changeSearch.bind(this)}
                                   refs="searchCmp"
                            />
                        </FormItem>
                    </Col>
                    <Col span={1}>
                        <Button shape="circle" icon="search"  onClick={this.searchSth.bind(this)}/>
                    </Col>
                    <Col span={8}>
                        <FormItem label="请选择单位"
                            {...formItemLayout}
                                  style={this.state.visible?{display:'inline-block'}:{display:'none'}}>
                            {getFieldDecorator('select-multiple', {
                                rules: [
                                    { required: true, message: '请选择单位!'},
                                ],
                            })(
                                <Select multiple placeholder="Please select favourite colors">
                                    <Option value="red">Red</Option>
                                    <Option value="green">Green</Option>
                                    <Option value="blue">Blue</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="已行驶公里数">
                            <Input type="text" defaultValue={detail.haveGo}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="保养公里数">
                            <Input type="text" defaultValue={detail.haveMaintian}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="故障次数">
                            <Input type="text" defaultValue={detail.breakdown}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="车辆年限">
                            <Input type="text" defaultValue={detail.old}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="累计方量">
                            <Input type="text" defaultValue={detail.breakdown}/>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
                        <FormItem label="累计车次">
                            <Input type="text" defaultValue={detail.times}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginBottom:1+"em"}}>
                    <Col span={8} style={{textAlign:"right"}}>
                        {
                            //todo:解绑驾驶员：驾驶员右侧点击【X】，提示框：确定将该驾驶员与车辆解除绑定吗？【是】【否】
                        }
                        <RadioGroup defaultValue="2">
                            <Radio style={radioStyle} value="1">驾驶员1 电话 上班</Radio><Icon type="close"
                                                                                        onClick={this.unbindDrv.bind(this,1)}/><br/>
                            <Radio style={radioStyle} value="2">驾驶员2 电话 上班</Radio><Icon type="close"
                                                                                        onClick={this.unbindDrv.bind(this,2)}/><br/>
                            <Radio style={radioStyle} value="3">驾驶员3 电话 上班</Radio><Icon type="close"
                                                                                        onClick={this.unbindDrv.bind(this,3)}/><br/>
                        </RadioGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    }
}));
export default detail;