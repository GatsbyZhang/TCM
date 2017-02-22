/*
 * 发货单位*/
import React, {Component, PropTypes} from 'react'
import Detail from './detail/deliveryDetail'
export  default class Options extends Component {
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
        $("#delivery-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '单位名称', '联系人', '电话', '合同数', '累计车数', '累计方数'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'unitName', index: 'unitName', width: "20%", align: "center"},
                    {name: 'linkMan', index: 'linkMan', width: "20%", align: "center"},
                    {name: 'telephone', index: 'telephone', width: "10%", align: "center"},
                    {name: 'contracts', index: 'contracts', width: "10%", align: "center"},
                    {name: 'carsNumber', index: 'carsNumber', width: "10%", align: "center"},
                    {name: 'cumNumber', index: 'cumNumber', width: "10%", align: "center"},
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pager: '#delivery-page',//表格页脚的占位符(一般是div)的id
                pgtext: '第{0}页   共 {1} 页',
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                autowidth: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#delivery-list").setGridWidth($("#delivery-cart").width() - 10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div id="delivery-cart">
                <Detail visible={this.state.visible} cartId="#delivery-list" changeState={this.changeState.bind(this)}/>
                <table id="delivery-list"></table>
                <div id="delivery-page"></div>
            </div>
        )
    }
}
