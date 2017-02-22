import React from 'react';
import UploadPic from './updatePic.jsx'
import Configuration from './configuration.jsx'
import {Form, Input, Select, Button, Icon, Row, Col, Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export default class userDetail extends React.Component {
    handleSubmit(e) {
        e.preventDefault();

    }

    emitEmpty() {
        this.props.innerUserAction.searchCompany('');
    }

    render() {
        const {carMngTodos, innerUserAction}=this.props;
        const {carsDetail}=carMngTodos;
        const radioStyle = {
            display: 'block',
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
                <h2>当前用户ID——{carMngTodos.detailId}</h2>
                <Row gutter={24}>
                    <Col span={4} style={{ textAlign: 'left' }}>
                        <UploadPic {...this.props}/>
                    </Col>
                    <Col span={20} style={{ textAlign: 'left' }}>
                        <Row gutter={16} style={{marginBottom:1+"em"}}>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="姓名">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="电话">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="初始密码">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{marginBottom:1+"em"}}>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="操作记录">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{marginBottom:1+"em"}}>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="创建人">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="创建时间">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                            <Col span={8} style={{textAlign:"right"}}>
                                <FormItem label="在线时长">
                                    <Input type="text" value={detail.haveMaintian}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="hr" style={{height:0,border:"solid 1px #108EE9",marginBottom:2+"em",marginTop:1+"em"}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{height:2+"em",lineHeight:2+"em"}}>
                        选择菜单
                    </Col>
                </Row>
                <Row stylr={{marginTop:"2em"}}>
                    <Col span={20}>
                        <Configuration {...this.props}/>
                    </Col>
                </Row>
            </Form>
        </div>
    }
}