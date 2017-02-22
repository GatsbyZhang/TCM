/*
 * 未绑定的单位用户
 * */
import React, {Component, PropTypes} from 'react'
import Detail from './detail'
import severRoot from 'CONSTANTS'
export  default class UnbindDriver extends Component {
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
        $("#unbindDriver-list").jqGrid(
            {
                url: severRoot + `DriverManage/DriverList?userid=${sessionStorage.UserId}&type=unbind`,
                autowidth: true,
                height: "auto",
                datatype: "json",
                colNames: ['序号', '姓名', '联系电话', '所属单位', '在线时长(小时)', '累计车次', '累计方数'],
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
                pager: '#unbindDriver-page',
                sortname: 'UserId',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                prmNames: {
                    page: null,
                    rows: "pageSize",
                    sort: "orderBy",
                    search: null,
                    nd: null,
                    id: "UserId",
                    deloper: "del",
                    subgridid: null,
                    npage: null,
                    totalrows: null
                },
                jsonReader: {
                    root: "resultData.Users",
                    page: (obj) => obj.resultData.CurrentPageIndex+1,
                    total: (obj) => obj.resultData.TotalPageCount,
                    records: "resultData.TotalRecordCount",
                    repeatitems: false,
                },
                ondblClickRow: function () {
                    change({visible: true})
                },
                gridComplete:function () {
                    $(".driver-top>span.unbind").text($("#unbindDriver-list").jqGrid('getGridParam', 'records'))
                },
                beforeRequest: function () {
                    let currentPage = $("#unbindDriver-list").jqGrid('getGridParam', 'page')
                    let url = severRoot + `DriverManage/DriverList?userid=${sessionStorage.UserId}&type=unbind&pageIndex=${currentPage - 1}`
                    $("#unbindDriver-list").jqGrid('setGridParam', {url: url})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#unbindDriver-list").setGridWidth($("#driver-cart").width() - 10)
        });

        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div className="driver">
                <div className="driver-top">
                    累计数量：<span className="unbind"></span>
                </div>
                <div id="driver-cart">
                    <Detail visible={this.state.visible} cartId="#unbindDriver-list"
                            changeState={this.changeState.bind(this)}/>
                    <table id="unbindDriver-list"></table>
                    <div id="unbindDriver-page"></div>
                </div>
            </div>
        )
    }
}
