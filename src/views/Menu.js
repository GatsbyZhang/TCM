/**
 * 左侧菜单列表
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../redux/actions/actions.js'
import 'ASSET/scss/menu'
import {Icon} from 'antd'
class Menu extends Component {
    liClickHandler(e) {
        if (!$(e.target).hasClass("checked")) {
            $("#menu li").removeClass("checked")
            $(e.target).toggleClass("checked")
            this.props.actions.clickListMenu(e.target.getAttribute('data-name'));
            //点击左边菜单取消高级搜索中的高亮部分
            this.props.actions.hightlightCmp('');

        }
    }
    getName(menuName){
        //定位到当前显示的模块，是菜单的样式改变
        switch(menuName){
            case 'Index':
                return 0;
            case 'Matching':
                return 1;
            case 'Register':
                return 2;
            case 'SendGoods':
                return 3;
            case 'TakeGoods':
                return 4;
            case 'Rent':
                return 5;
            case 'Identification':
                return 6;
            case 'Project':
                return 7;
            case 'Driver':
                return 8;
            case 'CarsManagement':
                return 9;
            case 'Compact':
                return 10;
            case 'Statistics':
                return 11;
            case 'InnerUser':
                return 12;
            case 'Configuration':
                return 13;
            case 'HandleRecord':
                return 14;
            default:
                return 15;
        }
    }
    componentDidMount(){
        var oDiv=  document.getElementById('menu');
        var Ali=oDiv.getElementsByTagName('li');
        var TagName=this.props.tagName?this.props.tagName:this.props.name.name;
        let i=this.getName(TagName);
        $("#menu li").removeClass("checked")
       $(`#menu ul li:eq(${i})`).addClass('checked')
    }
    render() {
        return (
            <div id="menu">
                <ul onClick={this.liClickHandler.bind(this)}>
                   
                    <li className="checked" data-name="Index"><Icon type="home" />&nbsp;首页</li>
                    <li data-name="Matching"><Icon type="link" />&nbsp;匹配</li>
                    <li data-name="Register"><Icon type="solution" />&nbsp;注册用户</li>
                    <li data-name="SendGoods"><Icon type="menu-fold" />&nbsp;发货单位管理</li>
                    <li data-name="TakeGoods"><Icon type="menu-unfold" />&nbsp;收货单位管理</li>
                    <li data-name="Rent"><Icon type="pay-circle-o" />&nbsp;租赁单位管理</li>
                    <li data-name="Identification"><Icon type="credit-card" />&nbsp;认证</li>
                    <li data-name="Project"><Icon type="folder" />&nbsp;工程</li>
                    <li data-name="Driver"><Icon type="team" />&nbsp;驾驶员</li>
                    <li data-name="CarsManagement"><Icon type="exception" />&nbsp;车辆管理</li>
                    <li data-name="Compact"><Icon type="file-text" />&nbsp;合同</li>
                    <li data-name="Statistics"><Icon type="area-chart" />&nbsp;统计</li>
                    <li data-name="InnerUser"><Icon type="user" />&nbsp;内部用户管理</li>
                    <li data-name="Configuration"><Icon type="setting" />&nbsp;后台配置</li>
                    <li data-name="HandleRecord"><Icon type="pushpin-o" />&nbsp;操作记录</li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name:state.reducer
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
)(Menu);