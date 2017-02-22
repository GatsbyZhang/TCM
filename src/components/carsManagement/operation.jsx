import React from 'react';
import 'COMMON/rightkeys'
import severRoot from '../../redux/constants/index'

import {Tabs, Button, Select, Option, Tag, Modal,message} from 'antd';
const confirm = Modal.confirm;

export default class Operation extends React.Component {

    //TODO：数据显示及后续处理

    operateData = ()=> {


        let _this=this;
        $("#operate-table").jqGrid({
            url: severRoot+`VehicleManage/OperateRec?userid=${sessionStorage.UserId}`,
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            jsonReader : {
                root: (obj)=>obj.resultData.records,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "Id",
            },
            colNames: ["编号", "操作人", "操作对象", "操作", "操作时间", "撤销"],
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
            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: 20,//每页显示记录数
            pager: $('#operatePager'),
            sortable: true,
            loadComplete:function (xhr) {
                let idArr = $("#operate-table").jqGrid('getDataIDs');
                for(var i=0;i<idArr.length;i++){
                    let id=idArr[i];
                    $(`#roll-btn-${id}`).bind('click',function () {
                        _this.rollbackStyle(id)
                    });
                }

            }
        });

    };
    
    rollbackStyle(id){
        $('#roll-btn-disabled').attr("disabled",true);
        confirm({
            title: '确认撤销吗?'+id,
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
        return <div className="cars-all">
            <div>

                <div className="options">
                    <span>选择:____</span>
                    <span>累计：26</span>
                </div>
            <table id="operate-table">
            </table>
            <div id="operatePager"></div>
            </div>
        </div>
    }
}