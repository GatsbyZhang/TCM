import React from 'react'
import {Button,Row,Col} from 'antd';
const ButtonGroup = Button.Group;
import CompanyType from "./companyType";
import CompanyNumber from "./companyNumber";
import ProjectNumber from "./projectNumber";
import StaffNumber from "./StaffNumber";
import './index.scss'
export default  class StatisticsIndex extends React.Component {

    //TODO:样式优化
    // TODO:AJAX数据加载（"月"数据并无本地模拟，所以没有效果）

    constructor(props) {
        super(props);
        this.state = {
            primary:1
        }
    }
    toggleTime(toggleName, e) {

        e.preventDefault();
        this.setState({
            primary:toggleName
        });
        const {staticTodos,actions}=this.props;
        switch (toggleName){
            case 1:
                actions.toggleDay();
                break;
            case 2:
                actions.toggleWeek();
                break;
            case 3:
                actions.toggleDay();
                break;
            case 4:
                actions.toggleSeason();
                break;
            case 5:
                actions.toggleYear();
                break;
            default:
                actions.toggleDay();
        }
        

    }

    render() {
        const {staticTodos,actions}=this.props;
        return (
            <div id="static-container" style={{padding:1.5+"em",background:"#FFF"}}>
                <ButtonGroup id="button-group" style={{marginBottom:"3em"}}>
                    <Button type={this.state.primary==1?"primary":""} onClick={this.toggleTime.bind(this,1)}>当天</Button>
                    <Button type={this.state.primary==2?"primary":""} onClick={this.toggleTime.bind(this,2)}>周</Button>
                    <Button type={this.state.primary==3?"primary":""} onClick={this.toggleTime.bind(this,3)}>月</Button>
                    <Button type={this.state.primary==4?"primary":""} onClick={this.toggleTime.bind(this,4)}>季度</Button>
                    <Button type={this.state.primary==5?"primary":""} onClick={this.toggleTime.bind(this,5)}>年</Button>
                </ButtonGroup>
                <div>
                    <Row type="flex" justify="space-around" style={{marginBottom:"2em"}}>
                        <Col span={10}><CompanyType {...this.props}/></Col>
                        <Col span={10}><StaffNumber {...this.props}/></Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col span={10}><CompanyNumber {...this.props}/></Col>
                        <Col span={10}><ProjectNumber {...this.props}/></Col>
                    </Row>
                </div>
            </div>
        )
    }
}