/*
 全部驾驶员
 * */
import React, {Component, PropTypes} from 'react'
import Detail from './detail'
import severRoot from 'CONSTANTS'
export  default class AllDriver extends Component {
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
        $("#allDriver-list").jqGrid(
            {
                url: severRoot + `DriverManage/DriverList?userid=${sessionStorage.UserId}&type=all`,
                autowidth: true,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '姓名', '联系电话', '所属单位', '在线时长', '累计车次', '累计方数'],
                colModel: [
                    {name: 'UserId', index: 'UserId', width: "15%", align: "center"},
                    {name: 'UName', index: 'UName', width: "12%", align: "center"},
                    {name: 'UPhone', index: 'UPhone', width: "13%", align: "center"},
                    {name: 'UnitName', index: 'UnitName', width: "15%", align: "center"},
                    {name: 'OnlineTime', index: 'OnlineTime', width: "15%", align: "center"},
                    {name: 'Ljcs', index: 'Ljcs', width: "12%", align: "center"},
                    {name: 'Ljfs', index: 'Ljfs', width: "13%", align: "center"},
                ],
                rowNum: 10,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#allDriver-page',//表格页脚的占位符(一般是div)的id
                sortname: 'UserId',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                prmNames: {
                    page: null,    // 表示请求页码的参数名称
                    rows: "pageSize",    // 表示请求行数的参数名称
                    sort: "orderBy", // 表示用于排序的列名的参数名称
                    order: "order", // 表示采用的排序方式的参数名称
                    search: null, // 表示是否是搜索请求的参数名称
                    nd: null, // 表示已经发送请求的次数的参数名称
                    id: "UserId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                    deloper: "del", // 当在delete模式中提交数据时，操作的名称
                    subgridid: null, // 当点击以载入数据到子表时，传递的数据名称
                    npage: null,
                    totalrows: null// 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
                },
                jsonReader: {
                    root: "resultData.Users",   // json中代表实际模型数据的入口
                    page: (obj) => obj.resultData.CurrentPageIndex + 1,   // json中代表当前页码的数据
                    total:"resultData.TotalPageCount",
                    records: (obj) => obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                    repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                },
                ondblClickRow: function () {
                    change({visible: true})
                },
                gridComplete: function () {
                    $(".driver-top>span.all").text($("#allDriver-list").jqGrid('getGridParam', 'records'))
                },
                beforeRequest: function () {
                    let currentPage = $("#allDriver-list").jqGrid('getGridParam', 'page')
                    let url = severRoot + `DriverManage/DriverList?userid=${sessionStorage.UserId}&type=all&pageIndex=${currentPage - 1}`
                    $("#allDriver-list").jqGrid('setGridParam', {url: url})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#allDriver-list").setGridWidth($("#driver-cart").width() - 10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div className="driver">
                <div className="driver-top">
                    累计数量：<span className="all"></span>
                </div>
                <div id="driver-cart">
                    <Detail visible={this.state.visible} cartId="#allDriver-list"
                            changeState={this.changeState.bind(this)}/>
                    <table id="allDriver-list"></table>
                    <div id="allDriver-page"></div>
                </div>
            </div>
        )
    }
}
