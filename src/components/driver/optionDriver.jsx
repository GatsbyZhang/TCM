/*
 * 操作记录
 * */
import React, {Component, PropTypes} from 'react'
import severRoot from 'CONSTANTS'
export  default class OptionDriver extends Component {
    componentDidMount() {

        $("#optionDriver-list").jqGrid(
            {
                url: severRoot + `UserManager/OperateRec?userid=${sessionStorage.UserId}`,
                autowidth: true,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['编号', '操作人', '操作对象', '操作', '操作时间', '撤销'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'Id', index: 'Id', width: "20%", align: "center", sortable: false},
                    {name: 'UName', index: 'UName', width: "20%", align: "center", sortable: false},
                    {name: 'Target', index: 'Target', width: "20%", align: "center", sortable: false},
                    {name: 'Type', index: 'Type', width: "10%", align: "center", sortable: false},
                    {
                        name: 'OperateTimeStamp',
                        index: 'OperateTimeStamp',
                        width: "10%",
                        align: "center",
                        sortable: false
                    },
                    {
                        name: 'CanUndo', index: 'CanUndo', width: "10%", align: "center", formatter: function (obj) {
                        if (obj) {
                            return '<button class="cancel" title="点击可撤销">撤销</button>'
                        } else {
                            return '<button class="cancel cancel-disabled" disabled title="不可撤销">撤销</button>'
                        }
                    }, sortable: false
                    },
                ],
                rowNum: 10,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#optionDriver-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                prmNames: {
                    page: null,
                    rows: "pageSize",
                    sort: null,
                    order: null,
                    search: null,
                    nd: null,
                    id: "id",
                    deloper: "del",
                    subgridid: null,
                    npage: null,
                    totalrows: null
                },
                jsonReader: {
                    root: "resultData",
                    page: (obj) => obj.resultData.CurrentPageIndex + 1,
                    total: (obj) => {
                        console.log(obj)
                        return obj.resultData.TotalPageCount
                    },
                    records: "resultData.TotalRecordCount",
                    repeatitems: false,
                },
                gridComplete: function () {
                    //获取总记录数
                    $(".driver-top>span.operate").text($("#optionDriver-list").jqGrid('getGridParam', 'records'))

                    $('#optionDriver-list button.cancel').click(function () {
                        let rowid = $("#optionDriver-list").jqGrid("getGridParam", "selrow")//所选择的行id
                        $("#optionDriver-list").jqGrid('delGridRow', rowid,
                            {
                                left: 800,
                                top: 400,
                                caption: "撤销操作",
                                msg: "你确定要撤销此操作?",
                                bSubmit: "撤销",
                                bCancel: "取消",
                                url:"##"
                            })
                    })
                },
                beforeRequest: function () {
                    let currentPage = $("#optionDriver-list").jqGrid('getGridParam', 'page')
                    let url = severRoot + `UserManager/OperateRec?userid=${sessionStorage.UserId}&pageIndex=${currentPage - 1}`
                    $("#optionDriver-list").jqGrid('setGridParam', {url: url})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#optionDriver-list").setGridWidth($("#driver-cart").width() - 10)
        });
    }

    render() {
        return (
            <div className="driver">
                <div className="driver-top">
                    累计数量：<span className="operate"></span>
                </div>
                <div id="driver-cart">
                    <table id="optionDriver-list" className="option-record"></table>
                    <div id="optionDriver-page"></div>
                </div>
            </div>
        )
    }
}
