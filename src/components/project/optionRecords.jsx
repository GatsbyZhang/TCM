/*
 * 操作记录
 * */
import React, {Component, PropTypes} from 'react'
export  default class OptionRecords extends Component {

    componentDidMount() {
        $("#optionRecords-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['编号', '操作人', '操作对象', '操作', '操作时间', '撤销'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center", sortable: false},
                    {name: 'operater', index: 'operater', width: "20%", align: "center", sortable: false},
                    {name: 'operateObj', index: 'operateObj', width: "20%", align: "center", sortable: false},
                    {name: 'operate', index: 'operate', width: "10%", align: "center", sortable: false},
                    {name: 'operateDate', index: 'operateDate', width: "10%", align: "center", sortable: false},
                    {
                        name: 'cancel', index: 'cancel', width: "10%", align: "center", formatter: function (obj) {
                        if (obj) {
                            return '<button class="cancel" title="点击可撤销">撤销</button>'
                        } else {
                            return '<button class="cancel cancel-disabled" disabled title="不可撤销">撤销</button>'
                        }
                    }, sortable: false
                    },
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pager: '#optionRecords-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                gridComplete: function () {
                    $('button.cancel').click(function () {
                        let rowid = $("#optionRecords-list").jqGrid("getGridParam", "selrow")//所选择的行id
                        $("#optionRecords-list").jqGrid('delGridRow', rowid, {
                            left: 800,
                            top: 400,
                            caption: "撤销操作",
                            msg: "你确定要撤销此操作?",
                            bSubmit: "撤销",
                            bCancel: "取消",
                            url: "##"
                        });
                    })
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#optionRecords-list").setGridWidth($("#optionRecords-cart").width() - 10)
        });
    }

    render() {
        return (
            <div id="optionRecords-cart">
                <table id="optionRecords-list" className="option-record"></table>
                <div id="optionRecords-page"></div>
            </div>
        )
    }
}