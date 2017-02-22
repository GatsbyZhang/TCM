/**
 * 主页负责state流向
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as Actions from '../redux/actions/actions';
import 'ASSET/scss/main';
import Index from '../components/index/index.jsx';
import Matching from '../components/matching/index.jsx';
import Register from '../components/register/index.jsx';
import SendGoods from '../components/sendGoods/index.jsx';
import TakeGoods from '../components/takeGoods/index.jsx';
import Rent from '../components/rent/index.jsx';
import Identification from '../components/identification/index.jsx';
import Project from '../components/project/index.jsx';
import Driver from '../components/driver/index.jsx';
import CarsManagement from '../components/carsManagement/index.jsx';
import Compact from '../components/compact/index.jsx';
import Statistics from '../components/statistics/index.jsx';
import InnerUser from '../components/innerUser/index.jsx';
import Configuration from '../components/configuration/index.jsx';
import HandleRecord from '../components/handleRecord/index.jsx';
import * as indexAction from 'ACTION/indexAction'
import * as driverAction from 'ACTION/driverAction'
import * as registerAction from 'ACTION/registerAction'
import * as matchingAction from 'ACTION/matchingAction'
import * as sendGoodsAction from 'ACTION/sendGoodsAction'
import * as innerUserAction from 'ACTION/innerUserAction'
class Main extends Component {
    getName(menuName){
        switch(menuName){
            case 'Index':
                return <Index {...this.props.indexAction} init={this.props.index}/>;
            case 'Matching':
                return <Matching  matchingAction={this.props.matchingAction} matchingTodos={this.props.matchingTodos}/>;
            case 'Register':
                return <Register registerAction={this.props.registerAction} registerTodos={this.props.registerTodos}/>;
            case 'SendGoods':
                return <SendGoods sendGoodsAction={this.props.sendGoodsAction} sendGoodsTodos={this.props.sendGoodsTodos}  {...this.props} />;
            case 'TakeGoods':
                return <TakeGoods sendGoodsAction={this.props.sendGoodsAction} sendGoodsTodos={this.props.sendGoodsTodos} {...this.props}/>;
            case 'Rent':
                return <Rent sendGoodsAction={this.props.sendGoodsAction} sendGoodsTodos={this.props.sendGoodsTodos} {...this.props} />;
            case 'Identification':
                return <Identification {...this.props}/>;
            case 'Project':
                return <Project {...this.props}/>;
            case 'Driver':
                return <Driver {...this.props.driverAction} driver={this.props.driver}/>;
            case 'CarsManagement':
                return <CarsManagement actions={this.props.actions} searchTodos={this.props.searchTodos} carMngTodos={this.props.carMngTodos}/>;
            case 'Compact':
                return <Compact {...this.props}/>;
            case 'Statistics':
                return <Statistics actions={this.props.actions} staticTodos={this.props.staticTodos}/>;
            case 'InnerUser':
                //innerUser暂时使用carMngTodos数据源
                return <InnerUser innerUserAction={this.props.innerUserAction} carMngTodos={this.props.carMngTodos} userTodos={this.props.userTodos}/>;
            case 'Configuration':
                return <Configuration />;
            case 'HandleRecord':
                return <HandleRecord/>;
            default:
                return <Index {...this.props}/>;
        }
    }
    render() {
        return (
            <div id="main">
                {this.getName(this.props.name.name)}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        state:state,
        name:state.reducer,
        searchTodos: state.searchReducer,
        sendGoodsTodos:state.sendGoodsReducer,
        carMngTodos:state.carsReducer,
        staticTodos:state.staticReducer,
        userTodos:state.userMngReducer,
        compactTodos:state.compactReducer,
        matchingTodos:state.matchingReducer,
        registerTodos:state.registerReducer,
        index:state.index,
        driver:state.driver
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch),
        indexAction:bindActionCreators(indexAction, dispatch),
        driverAction:bindActionCreators(driverAction, dispatch),
        registerAction:bindActionCreators(registerAction, dispatch),
        matchingAction:bindActionCreators(matchingAction, dispatch),
        sendGoodsAction:bindActionCreators(sendGoodsAction, dispatch),
        innerUserAction:bindActionCreators(innerUserAction, dispatch),
    }
}
module.exports = connect(//从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
    mapStateToProps,//建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps//定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象
)(Main);