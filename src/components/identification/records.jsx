import React, {Component, PropTypes} from 'react'
import Dialog from './dialog'
import severRoot from 'CONSTANTS'
export  default class Records extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    changeState(state) {
        this.setState(state)
    }

    componentDidMount() {
        let change = this.changeState.bind(this)
        $("#iden-records-list").jqGrid({
            url: severRoot + `Unit/GetUnitAppealList`,//组件创建完成之后请求数据的url
            autowidth:true,
            height: "auto",
            datatype: "json",//请求数据返回的类型。可选json,xml,txt
            colNames: ['编号', '类别', '单位编号', '单位名称', '提交人', '电话', '状态'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'UnitId', index: 'UnitId', width: "10%", align: "center"},
                {name: 'UnitType', index: 'UnitType', width: "15%", align: "center"},
                {name: 'unitNumber', index: 'unitNumber', width: "20%", align: "center"},
                {name: 'UnitName', index: 'UnitName', width: "15%", align: "center"},
                {name: 'operater', index: 'operater', width: "10%", align: "center"},
                {name: 'telephone', index: 'telephone', width: "20%", align: "center"},
                {name: 'UnitAuditStatus', index: 'UnitAuditStatus', width: "10%", align: "center"}
            ],
            prmNames: {
                page: null,    // 表示请求页码的参数名称
                rows: "pageSize",    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search: null, // 表示是否是搜索请求的参数名称
                nd: null, // 表示已经发送请求的次数的参数名称
                id: "UnitId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper: "del", // 当在delete模式中提交数据时，操作的名称
                subgridid: null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows: null// 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            jsonReader: {
                root: "resultData",   // json中代表实际模型数据的入口
                page: (obj) => obj.resultData.CurrentPageIndex + 1,   // json中代表当前页码的数据
                total:"resultData.TotalPageCount",
                records: (obj) => {
                    console.log(obj)
                    return obj.resultData.TotalRecordCount
                }, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
            },
            rowNum: 10,//一页显示多少条
            pgtext: '第{0}页   共 {1} 页',
            rowList: [10, 15, 20],//可供用户选择一页显示多少条
            pager: '#iden-record-pager',//表格页脚的占位符(一般是div)的id

            sortname: 'UnitId',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
            viewrecords: true,//显示记录总数
            ondblClickRow: function () {
                change({visible: true})
            },
            gridComplete: function () {
                $(".records-top>span.iden-number").text($("#iden-records-list").jqGrid('getGridParam', 'records'))
            },
            beforeRequest: function () {
                let currentPage = $("#iden-records-list").jqGrid('getGridParam', 'page')
                let url = severRoot + `Unit/GetUnitAppealList?pageIndex=${currentPage - 1}`
                $("#iden-records-list").jqGrid('setGridParam', {url: url})
            }
        })
        $(window).resize(function () {//表格自适应屏幕
            $("#iden-records-list").setGridWidth($("#records-cart").width() - 10)
        });
    }

    render() {
        return (
            <div className="records">
                <Dialog visible={this.state.visible}  changeState={this.changeState.bind(this)}/>
                <div className="records-top">
                    累计：<span className="iden-number">120</span>
                </div>
                <div id="records-cart">
                    <table id="iden-records-list"></table>
                    <div id="iden-record-pager"></div>
                </div>
            </div>
        )
    }
}
