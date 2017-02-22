import React from 'react';
import {Row,Col, Icon,Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const plainOptions =['发货单位','收货单位','租赁单位'];
const plainOptions1 =['统计'];
const plainOptions2 =['注册用户','认证','匹配'];
const plainOptions3 =['后台配置','操作记录'];
const plainOptions4 =['合同','工程','驾驶员','车辆'];
const defaultCheckedList=['发货单位','收货单位','租赁单位'];
export default class Configuration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedList: defaultCheckedList,
            checkedList1: [],
            checkedList2: [],
            checkedList3: [],
            checkedList4: [],
            indeterminate: true,
            indeterminate1: true,
            indeterminate2: true,
            indeterminate3: true,
            indeterminate4: true,
            checkAll: false,
            checkAll1: false,
            checkAll2: false,
            checkAll3: false,
            checkAll4: false,
            checkedValueList: [],
            checkedValueList1: [],
            checkedValueList2: [],
            checkedValueList3: [],
            checkedValueList4: [],
        };
    }
    onChange(num,checkedList) {
        switch (num){
            case 0:
                this.setState({
                    checkedValueList:checkedList,
                    indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
                    checkAll: checkedList.length === plainOptions.length,
                });
                break;
            case 1:
                this.setState({
                    checkedValueList1:checkedList,
                    indeterminate1: !!checkedList.length && (checkedList.length < plainOptions1.length),
                    checkAll1: checkedList.length === plainOptions1.length,
                });
                break;
            case 2:
                this.setState({
                    checkedValueList2:checkedList,
                    indeterminate2: !!checkedList.length && (checkedList.length < plainOptions2.length),
                    checkAll2: checkedList.length === plainOptions2.length,
                });
                break;
            case 3:
                this.setState({
                    checkedValueList3:checkedList,
                    indeterminate3: !!checkedList.length && (checkedList.length < plainOptions3.length),
                    checkAll3: checkedList.length === plainOptions3.length,
                });
                break;
            case 4:
                this.setState({
                    checkedValueList4:checkedList,
                    indeterminate4: !!checkedList.length && (checkedList.length < plainOptions4.length),
                    checkAll4: checkedList.length === plainOptions4.length,
                });
                break;
        }

    }
    onCheckAllChange(num,e) {
        switch (num){
            case 0:
                this.setState({
                    indeterminate: false,
                    checkAll: !e.target.checked,
                    checkedValueList: !e.target.checked ? plainOptions : [],
                });
                break;
            case 1:
                this.setState({
                    indeterminate1: false,
                    checkAll1: !e.target.checked,
                    checkedValueList1: !e.target.checked ? plainOptions1 : [],
                });
                break;
            case 2:
                this.setState({
                    indeterminate2: false,
                    checkAll2: !e.target.checked,
                    checkedValueList2: !e.target.checked ? plainOptions2 : [],
                });
                break;
            case 3:
                this.setState({
                    indeterminate3: false,
                    checkAll3:! e.target.checked,
                    checkedValueList3: !e.target.checked ? plainOptions3 : [],
                });
                break;
            case 4:
                this.setState({
                    indeterminate4: false,
                    checkAll4: !e.target.checked,
                    checkedValueList4: !e.target.checked ? plainOptions4 : [],
                });
                break;
        }
    }
    render() {
        const {userTodos} =this.props;
        return (
            <div>
                <Row gutter={32}  type="flex" justify="space-around" align="top">
                    <Col span={8}>
                        <div className="config-div" style={{marginTop:"3em"}}>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange.bind(this,0)}
                                    checked={this.state.checkAll}
                                >
                                    单位组
                                </Checkbox>
                            </div>
                            <br />
                            <CheckboxGroup options={plainOptions} defaultValue={this.state.checkedList} value={this.state.checkedValueList} onChange={this.onChange.bind(this,0)}/>
                        </div>
                        <div className="config-div" style={{marginTop:"3em"}}>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate1}
                                    onChange={this.onCheckAllChange.bind(this,1)}
                                    checked={this.state.checkAll1}
                                >
                                    统计
                                </Checkbox>
                            </div>
                            <br />
                            <CheckboxGroup options={plainOptions1} defaultValue={this.state.checkedList1} value={this.state.checkedValueList1} onChange={this.onChange.bind(this,1)}/>

                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="config-div" style={{marginTop:"3em"}}>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate2}
                                    onChange={this.onCheckAllChange.bind(this,2)}
                                    checked={this.state.checkAll2}
                                >
                                    内部用户管理
                                </Checkbox>
                            </div>
                            <br />
                            <CheckboxGroup options={plainOptions2} defaultValue={this.state.checkedList2} value={this.state.checkedValueList2} onChange={this.onChange.bind(this,2)}/>
                        </div>
                        <div className="config-div" style={{marginTop:"3em"}}>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate3}
                                    onChange={this.onCheckAllChange.bind(this,3)}
                                    checked={this.state.checkAll3}
                                >
                                    设置
                                </Checkbox>
                            </div>
                            <br />
                            <CheckboxGroup options={plainOptions3} defaultValue={this.state.checkedList3} value={this.state.checkedValueList3} onChange={this.onChange.bind(this,3)}/>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="config-div" style={{marginTop:"3em"}}>
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                                <Checkbox
                                    indeterminate={this.state.indeterminate4}
                                    onChange={this.onCheckAllChange.bind(this,4)}
                                    checked={this.state.checkAll4}
                                >
                                    业务组
                                </Checkbox>
                            </div>
                            <br />
                            <CheckboxGroup options={plainOptions4} defaultValue={this.state.checkedList4} value={this.state.checkedValueList4} onChange={this.onChange.bind(this,4)}/>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}