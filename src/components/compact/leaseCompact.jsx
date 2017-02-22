/*
 * 租赁合同表格组件
 * */
import React, {Component, PropTypes} from 'react'
import Detail from './detail'
export  default class LeaseCompact extends Component {
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
        $("#leaseCompact-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '合同编号', '合同单位', '联系人', '电话','开始时间','结束时间'],//jqGrid的列显示名字
                colModel: [
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'contractNum', index: 'contractNum', width: "15%", align: "center"},
                    {name: 'contractUnit', index: 'contractUnit', width: "15%", align: "center"},
                    {name: 'linkMan', index: 'linkMan', width: "15%", align: "center"},
                    {name: 'telephone', index: 'telephone', width: "15%", align: "center"},
                    {name: 'startDate', index: 'startDate', width: "15%", align: "center"},
                    {name: 'endDate', index: 'endDate', width: "15%", align: "center"},
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#leaseCompact-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#leaseCompact-list").setGridWidth($("#compact-cart").width() - 10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div className="compact">
                <div className="compact-top">
                    累计：<span>120</span>
                </div>
                <div id="compact-cart">
                    <Detail innerCartId="lease-cart-list" visible={this.state.visible} cartId="#leaseCompact-list"
                            changeState={this.changeState.bind(this)}/>
                    <table id="leaseCompact-list"></table>
                    <div id="leaseCompact-page"></div>
                </div>
            </div>
        )
    }
}
