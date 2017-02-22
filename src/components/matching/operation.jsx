import React,{Component} from 'react';
import './index.scss';
import datas from './data.js';
import Merger from './merge.js';
import {Icon,Button} from 'antd';

class Operation extends Component{
    componentDidMount() {
        $("#matching-list4").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: datas.rows,
            mtype: "GET",//提交方式
            height:" auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '操作人', '操作对象','匹配对象','操作','操作时间','撤销'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'id', index: 'id', width: '5%', align: 'center'},
                {name: 'name', index: 'name', width: '10%', align: 'center',},
                {name: 'sendGoods', index: 'sendGoods', width: '20%', align: 'center',},
                {name: 'takeGoods', index: 'takeGoods', width: '20%', align: 'center',},
                {name: 'matching', index: 'matching', width: '20%', align: "center",},
                {name: 'date', index: 'date', width: '15%', align: "center",},
                {name: 'del', index: 'del', width: '10%', align: "center", sortable: false,
                formatter:function(cellvalue, options, rowObject){
                        return "<Button class='callBack '>撤销</Button>";
                }}
            ],
            rownumbers: false,//添加左侧行号
            //altRows:true,//设置为交替行表格,默认为false
            //sortname:'createDate',
            //sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            localReader: {
                root: datas.rows,
                id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#matching-gridPager4'),
            loadError: function () {
              
            },
            loadComplete: function (data) {
             
            },
        });
    }
    render(){
        return <div>
            <table id="matching-list4">
            </table>
            <div id="matching-gridPager4"></div>
        </div>
    }
}
export default Operation;