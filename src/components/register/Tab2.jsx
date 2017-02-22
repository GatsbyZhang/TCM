/**
 * Created by SWSD on 2017-01-06.
 */
import React, {Component, PropTypes} from 'react';
import {Tabs} from 'antd';
import severRoot from '../../redux/constants/index'

const TabPane = Tabs.TabPane;

class Tab2 extends Component {
    componentDidMount() {
        // let userDatas=this.props.sendGoodsTodos.userDatas;
        let that = this;
        $("#register-list2").jqGrid({
            url: severRoot + `UserManager/UserList?type=unbind&userid=${sessionStorage.UserId}`,
            datatype: "json",
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['编号', '姓名', '联系电话', '单位名称', '注册时间', '在线时长', '备注'],
            colModel: [
                {name: 'UserId', index: 'UserId', width: '5%', align: 'center', sortable: false},
                {name: 'UName', index: 'UName', width: '5%', align: 'center'},
                {name: 'UPhone', index: 'UPhone', width: '15%', align: "center", sortable: false},
                {name: 'UnitName', index: 'UnitName', width: '15%', align: "center", sortable: false},
                {name: 'RegisterTimeStamp', index: 'RegisterTimeStamp', width: '20%', align: "center", sortable:true,
                    formatter: function (cellvalue, options, rowObject) {
                        return new Date(parseInt(cellvalue) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                    }},
                {
                    name: 'OnlineTime', index: 'OnlineTime', width: '15%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return rowObject.OnlineTime + '小时'
                    }
                },
                {name: 'URoleCode', index: 'URoleCode', width: '15%', align: "center", sortable: false},
            ],
            rownumbers: false,//添加左侧行号
            prmNames: {
                page: "pageIndex",    // 表示请求页码的参数名称
                rows: "pageSize",    // 表示请求行数的参数名称
                sort: "sidx", // 表示用于排序的列名的参数名称
                order: "sord", // 表示采用的排序方式的参数名称
                search: null, // 表示是否是搜索请求的参数名称
                nd: null, // 表示已经发送请求的次数的参数名称
                id: "UserId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper: "del", // 当在delete模式中提交数据时，操作的名称
                subgridid: null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows: null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            sortable: true,
            sortname: 'RegisterTimeStamp',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            page: 0,
            viewrecords: true,//是否在浏览导航栏显示记录总数
            jsonReader: {
                root: (obj)=>obj.resultData.Users,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex + 1,   // json中代表当前页码的数据
                total: (obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: "obj.resultData.TotalRecordCount", // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "UserId",
            },
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 15,//每页显示记录数
            pager: $('#register-gridPager2'),
            ondblClickRow: function (id, iRow, iCol, e) {
                console.log('>>>>>>id>>',id)
                console.log('>>>>>>iRow>>',iRow)
                if (iCol != 7) {
                    that.props.showModel(id);
                }
            },
        });
        // require('COMMON/rightkeys')(that.props.actions.toggleRegisterModelList);//自定义右键功能
    }

    render() {
        return (
            <div >
                <table id="register-list2">
                </table>
                <div id="register-gridPager2"></div>

            </div>
        )
    }
}
export default Tab2;