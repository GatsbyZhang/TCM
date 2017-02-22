/**
 * 头部
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from 'ACTION/headerAction'
import 'ASSET/scss/header'
import {Icon, Popover} from 'antd'
import UserSetting from './header/userSetting'
import './header/seting.scss'
import severRoot from 'CONSTANTS'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showSearch: false
        }
    }

    changeState(state) {
        this.setState(state)
    }

    search(e) {
        if (e.keyCode == 13) {
            let v = e.target.value;
            let TagName = this.props.name.name;
            let text;
            //在当前页搜索
            switch (TagName) {
                case 'Index':
                    text = 'index';
                    break;
                case 'Matching':
                    text = 'matching';
                    break;
                case 'Register':
                    text = 'register';
                    break;
                case 'SendGoods':
                    text = 'sendGoods';
                    break;
                case 'TakeGoods':
                    text = 'takeGoods';
                    break;
                case 'Rent':
                    text = 'rent';
                    break;
                case 'Identification':
                    text = 'identification';
                    break;
                case 'Project':
                    text = 'project';
                    break;
                case 'Driver':
                    text = 'driver';
                    break;
                case 'CarsManagement':
                    text = 'carsManagement';
                    break;
                case 'Compact':
                    text = 'compact';
                    break;
                case 'Statistics':
                    text = 'static-container';
                    break;
                case 'InnerUser':
                    text = 'innerUser';
                    break;
                case 'Configuration':
                    text = 'configuration';
                    break;
                case 'HandleRecord':
                    text = 'handleRecord';
                    break;
                default:
                    text = 'index';
            }
            let regex;
            $('#' + text).highlightRegex();

            try {
                regex = new RegExp(v, 'ig')
            }
            catch (e) {
                $('#simple-search').addClass('error')
            }
            if (typeof regex !== 'undefined') {
                $('#simple-search').removeClass('error');
                if (v != ''){
                    $('#' + text).highlightRegex(regex);
                    if(!regex.test($('#' + text).text())){
                        $(".header-search").css("border","solid 1px red");
                        $("#simple-search").val("无搜索结果！");
                    }
                    else{
                        $(".header-search").css("border","solid 1px #fff");
                    }
                }
                else{
                    $(".header-search").css("border","solid 1px #fff");
                }

            }
        }

    }

    advancedSearch() {
        this.props.changeSearch()
    }
    
    render() {
        const content = (
            <div className="user-hide">
                <a href="javascript:void(0)" onClick={this.changeState.bind(this,{visible:true})}>个人中心</a>
                <a href="javascript:void(0)" onClick={this.changeState.bind(this,{visible:true})}>个人设置</a>
                <a href="javascript:void(0)" onClick={this.props.actions.LoginOut}>注销登录</a>
            </div>
        );
        const imageUrl =severRoot +sessionStorage.UHeadImg;
        const preImgUrl=this.props.header.preImgUrl;
        return (
            <div id="header">
                <UserSetting visible={this.state.visible} changeState={this.changeState.bind(this)} {...this.props}/>
                <div className="header-logo left">
                    <Icon type="bars"/>
                    菜单列表
                </div>
                <div className="left head-title">
                    欢迎光临砼车后台管理
                </div>
                <div className="header-right right">
                    <Popover placement="bottomRight" content={content} trigger="click">
                        <div className="header-user-img">
                            {preImgUrl ? <img  src={preImgUrl}/> : <img src={imageUrl} className="avatar"/>}
                        </div>
                        <span>{sessionStorage.UName}</span>
                        <Icon className="icon-user" type="caret-right"/>
                    </Popover>
                </div>
                <div className="header-search right">
                    <Icon type="search"/>
                    <input id="simple-search" placeholder="回车搜索当前页" onKeyDown={this.search.bind(this)}/>
                    <a onClick={this.advancedSearch.bind(this)}>高级搜索</a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        header: state.headerReducer,
        name:state.reducer,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
module.exports = connect(//从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
    mapStateToProps,//建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps//定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象
)(Header);