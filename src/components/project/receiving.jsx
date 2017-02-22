/*
* 收货单位
* */
import React, {Component, PropTypes} from 'react'
import ReciveDetail from './detail/receiveDetail'
export  default class Receiving extends Component {
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
        $("#receiving-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '单位名称', '联系人', '电话', '合同数', '累计车数', '累计方数'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'unitName', index: 'unitName', width: "20%", align: "center"},
                    {name: 'linkMan', index: 'linkMan', width: "20%", align: "center"},
                    {name: 'telephone', index: 'telephone', width: "10%", align: "center"},
                    {name: 'contractNumber', index: 'contractNumber', width: "10%", align: "center"},
                    {name: 'carsNumber', index: 'carsNumber', width: "10%", align: "center"},
                    {name: 'cumNumber', index: 'gcumNumbergg', width: "10%", align: "center"},
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pager: '#receiving-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function(){//表格自适应屏幕
            $("#receiving-list").setGridWidth($("#receiving-cart").width()-10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div id="receiving-cart">
                <ReciveDetail visible={this.state.visible} cartId="#receiving-list" changeState={this.changeState.bind(this)}/>
                <table id="receiving-list"></table>
                <div id="receiving-page"></div>
            </div>
        )
    }
}
