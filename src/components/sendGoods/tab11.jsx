/**
 * Created by SWSD on 2017-01-06.
 */
/**
 * Created by SWSD on 2017-01-06.
 */
import React, {Component, PropTypes} from 'react';
import {message,Modal} from 'antd';
const confirm = Modal.confirm;
import datas from '../matching/data.js';
import severRoot from '../../redux/constants/index'


class Tab11 extends Component {
    componentDidMount() {
        //tab3
        const _this=this;
        $("#sendGoods-list11").jqGrid({
            url: severRoot+`SUnitManage/OperateRec?userid=${sessionStorage.UserId}`,
            datatype: "json", //数据来源，本地数据
            mtype: "GET",//提交方式
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
                            return `<button class="roll-btn" id="send-roll-btn-${rowObject.Id}" >撤销</button>`
                        }else{
                            return `<button disabled="disabled" class="roll-btn-disabled" >撤销</button>`
                        }

                    }},
            ],
            jsonReader : {
                root: (obj)=>obj.resultData.records,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "Id",
            },
            rownumbers: false,//添加左侧行号
            //altRows:true,//设置为交替行表格,默认为false
            //sortname:'createDate',
            //sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 15,//每页显示记录数
            rowList: [2, 4, 6],//用于改变显示行数的下拉列表框的元素数组。
            localReader: {
                root: datas.rows,
                repeatitems: false,
            },
            pager: $('#sendGoods-gridPager11'),
            loadError: function () {
               
            },
            loadComplete: function (data) {
                let idArr = $("#sendGoods-list11").jqGrid('getDataIDs');
                for(var i=0;i<idArr.length;i++){
                    let id=idArr[i]
                    $("#send-roll-btn-"+idArr[i]).bind('click',function () {
                        _this.rollbackStyle(id)
                    });
                }
            }
        });
    }
    rollbackStyle(id){
        confirm({
            title: '确认撤销吗?'+id,
            content: '该操作无法回退，请确认！',
            onOk() {
                message.success('操作已撤销');
            },
            onCancel() {},
        });
    }
    render() {
        return (
            <div >
                <table id="sendGoods-list11">
                </table>
                <div id="sendGoods-gridPager11"></div>
            </div>
        )
    }
}
export default Tab11;