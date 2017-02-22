import React from 'react';
import UserDetail from './userDetail.jsx';
import {Tabs, Button, Select, Option, Tag, Modal} from 'antd';
const TabPane = Tabs.TabPane;

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userVisible: false,
        }
    }
    rollbackStyle(iCol){
        $('#roll-btn-disabled').attr("disabled",true);
        var r=confirm("确认撤销吗");
        if (r==true)
        {
            alert("成功撤销!");
        }
        else
        {

        }
    }
    handleOk() {
        const {actions, userTodos}=this.props;
        actions.toggleUserModel(false);
        this.setState({
            userVisible:false
        })
    }

    handleCancel() {
        this.setState({
            userVisible:false
        })
    }

    showModel(carId,json) {
        const {innerUserAction}=this.props;
        innerUserAction.fetchCarDetail(carId);
        console.log(json)
        this.setState({
            userVisible:true,
            type: json.type
        })
    }
    componentDidMount() {
        let _this=this;
        $("#userMng-table").jqGrid({
            url: "/static/Carsdata.json",
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            jsonReader: {
                repeatitems: false,
                root: function (obj) {
                    return obj.userMng;
                },
            },
            colNames: ["编号", "姓名", "电话", "在线时长", "操作记录"],
            colModel: [
                {name: "id", index: "id", width: 100, align: "center", sortable: true},
                {name: "operator", index: "operator", width: 100, align: "center"},
                {name: "tel", index: "tel", width: 100, align: "center"},
                {name: "onlineTime", index: "onlineTime", width: 100, align: "center", sortable: false},
                {name: "operateRecord", index: "operateRecord", width: 100, align: "center"}
            ],
            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: 20,//每页显示记录数
            rowList: [20, 30],//用于改变显示行数的下拉列表框的元素数组。
            pager: $('#userPager'),
            sortable: true,
            ondblClickRow:function (id) {
                _this.showModel(id,{type:"show"})
            },
        });
        function copy() {
            //todo:刷新数据
            $("#userMng-table").trigger("reloadGrid")
        }

        require('COMMON/rightkeys')(_this.showModel.bind(_this),copy.bind(_this));//自定义右键功能

    };

    render() {
        const {userTodos}=this.props;
        return <div className="user-all">
            <table id="userMng-table">
            </table>
            <div id="userPager"></div>
            <Modal title="用户详情"
                   visible={this.state.userVisible}
                   onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                   id="user-detail-model" width="1300px"
                   okText={this.state.type=='add'?"新增":"修改"}
                   cancelText="取消"
            >
                <UserDetail {...this.props}/>
            </Modal>
        </div>
    }
}