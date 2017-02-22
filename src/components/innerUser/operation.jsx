import React from 'react';

import { Modal,message  } from 'antd';
const confirm = Modal.confirm;
export default class Operation extends React.Component {

    //TODO：数据显示及后续处理

    operateData = ()=> {


        let _this=this;
        $("#userOperate-table").jqGrid({
            url: "/static/Carsdata.json",
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            jsonReader: {
                repeatitems: false,
                // roots: "carsItem",
                root: function (obj) {
                    return obj.operation;
                },
            },
            colNames: ["编号", "操作人", "操作对象", "操作", "操作时间", "撤销"],
            colModel: [
                {name: "id", index: "id", width: 100, align: "center", sortable: true},
                {name: "operator", index: "operator", width: 100, align: "center"},
                {name: "operateObject", index: "operateObject", width: 100, align: "center"},
                {name: "operate", index: "operate", width: 100, align: "center", sortable: false},
                {
                    name: "operateTime", index: "operateTime", width: 100, align: "center", sortable: false,
                    editable: true,
                },
                {name: "rollback", index: "rollback", width: 100, align: "center", sortable: false,
                    formatter:function(cellvalue, options, rowObject){
                        if(rowObject.operate==="删除"){
                            return `<button class="roll-btn" class="roll-btn" >${cellvalue}</button>`
                        }else{
                            return `<button disabled="disabled" class="roll-btn-disabled" >${cellvalue}</button>`
                        }

                }},
            ],
            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: 20,//每页显示记录数
            rowList: [20, 30],//用于改变显示行数的下拉列表框的元素数组。
            pager: $('#userOperatePager'),
            sortable: true,
            loadComplete:function (rowid,iCol,cellcontent,e) {
                $("#userOperate-table .roll-btn").bind('click',function () {
                    _this.rollbackStyle(iCol)
                });
            }
        });

    };


    rollbackStyle(iCol){
        $('#roll-btn-disabled').attr("disabled",true);
        confirm({
            title: '确认撤销吗?',
            content: '该操作无法回退，请确认！',
            onOk() {
                message.success('操作已撤销');
            },
            onCancel() {},
        });
    }

    componentDidMount() {
        this.operateData();
    };

    render() {
        const {carMngTodos}=this.props;
        return <div className="innerUser">
            <table id="userOperate-table">
            </table>
            <div id="userOperatePager"></div>
        </div>
    }
}