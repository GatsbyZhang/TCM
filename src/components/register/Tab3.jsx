/**
 * Created by SWSD on 2017-01-06.
 */
/**
 * Created by SWSD on 2017-01-06.
 */
import React, {Component, PropTypes} from 'react';
import datas from '../matching/data.js';
import {Tabs} from 'antd';
import severRoot from '../../redux/constants/index'

const TabPane = Tabs.TabPane;

class Tab3 extends Component {
    //todo:‘colModel’ 项无数据
    componentDidMount() {
        //tab3
        $("#register-list3").jqGrid({
            url: severRoot+`UserManager/OperateRec?userid=${sessionStorage.UserId}`,
            datatype: "json",
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '操作人', '操作对象','操作','操作时间','撤销'],
            colModel: [
                {name: "Id", index: "Id", width: 100, align: "center", sortable: true},
                {name: "UName", index: "UName", width: 100, align: "center"},
                {name: "Target", index: "Target", width: 100, align: "center"},
                {name: "Type", index: "Type", width: 100, align: "center", sortable: false},
                {
                    name: "OperateTimeStamp", index: "OperateTimeStamp", width: 100, align: "center", sortable: false,
                    formatter:function(cellvalue,options,rowObject){

                        return new Date(parseInt(cellvalue) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                    }
                },
                {name: "CanUndo", index: "CanUndo", width: 100, align: "center", sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        if(cellvalue){
                            return `<button class="roll-btn" id="roll-btn-${rowObject.Id}" >撤销</button>`
                        }else{
                            return `<button disabled="disabled" class="roll-btn-disabled" >撤销</button>`
                        }

                    }},
            ],
            prmNames : {
                page:"pageIndex",    // 表示请求页码的参数名称
                rows:"pageSize",    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search:null, // 表示是否是搜索请求的参数名称
                nd:null, // 表示已经发送请求的次数的参数名称
                id:"Id", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper:"del", // 当在delete模式中提交数据时，操作的名称
                subgridid:null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows:null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            rownumbers: false,//添加左侧行号
            //altRows:true,//设置为交替行表格,默认为false
            sortname:'OperateTimeStamp',
            sortorder:'desc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 15,//每页显示记录数
            rowList: [2, 4, 6],//用于改变显示行数的下拉列表框的元素数组。
            jsonReader : {
                root: (obj)=>obj.resultData,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "Id",
            },
            pager: $('#register-gridPager3'),
            loadComplete: function (xhr) {
               // console.log("reg3>>>>>>",xhr)
            },

        });
    }
    render() {
        return (
            <div >
                <table id="register-list3">
                </table>
                <div id="register-gridPager3"></div>
            </div>
        )
    }
}
export default Tab3;