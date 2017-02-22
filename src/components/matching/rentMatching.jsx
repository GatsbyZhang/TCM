import React, {Component} from 'react';
import './index.scss';
import Merger from './merge.js';
import {Modal,message} from 'antd';
const confirm = Modal.confirm;
class RentMatching extends Component {
    componentDidMount() {
        const data=this.props.matchingTodos.matchingDatas.rows;
        const that = this;
        $("#matching-list2").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: data,
            mtype: "GET",//提交方式
            height:" auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '合同中发货单位', '合同中收货单位', '匹配单位(已注册的收货单位)   <button id="rSerach" style="width:50px;height:30px;line-height30px;border-radius:3px;' +
            'text-align:center;background: #1C94C4; color: white;border:none">搜索</button>', '操作'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'id', index: 'id', width: '10%', align: 'center'},
                {
                    name: 'sendGoods2', index: 'sendGoods2', width: '20%', align: 'center',
                    formatter: function (cellvalue, options, rowObject) {
                        return rowObject.sendGoods
                    },
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //合并单元格
                        return 'id=\'sendGoods2' + rowId + "\'";
                    }
                },
                {
                    name: 'takeGoods2', index: 'takeGoods2', width: '20%', align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        return rowObject.takeGoods
                    },
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //合并单元格
                        return 'id=\'takeGoods2' + rowId + "\'";
                    }
                },
                {
                    name: 'matching', index: 'matching', width: '35%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return rowObject.matching + '  ' + rowObject.name + '  ' + rowObject.telNumber;
                    }
                },
                {
                    name: 'del', index: 'del', width: '15%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return " <Button type='primary ' id='rMatchingBtn"+rowObject.id+"'>匹配</Button>"
                    }
                }
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
                root: data,
                id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#matching-gridPager2'),
            gridComplete: function () {
                //②在gridComplete调用合并方法
                var gridName = "matching-list2";
                Merger(gridName, 'sendGoods2');
                Merger(gridName, 'takeGoods2');
            },
        });
        $('#rSerach').click(function(){
            that.props.matchingAction.showMatching1CompanyList()
        });
        require('COMMON/rightkeys')();//自定义右键功能
        let mya = $("#matching-list2").getDataIDs();
        for(var i=0;i<mya.length;i++){
            let row = $("#matching-list2").jqGrid('getLocalRow', i);//返回原始json数据
            $("#rMatchingBtn"+row.id).click(function(){
                //todo:后台匹配操作，并返回匹配结果
                that.rMatchingOpration(row.id)
            })
        }
    }
    rMatchingOpration(index){
        confirm({
            title: '确认与ID为'+index+'的单位进行匹配吗?',
            content: '该操作可在操作记录中撤销！',
            onOk() {
                message.success('匹配成功');
            },
            onCancel() {},
        });
    }
    render() {
        return <div>
            <table id="matching-list2">
            </table>
            <div id="matching-gridPager2"></div>
        </div>
    }
}
export default RentMatching;