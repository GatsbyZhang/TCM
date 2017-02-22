/*
 * 选择模版表格组件
 * */
import React, {Component, PropTypes} from 'react'
import Details from './detail/chooseDetail'
export  default class ChooseModule extends Component {
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
        $("#chooseModule-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '名称', '被选择项数', '生效时间', '备注'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "20%", align: "center"},
                    {name: 'name', index: 'name', width: "20%", align: "center"},
                    {name: 'choosedNum', index: 'choosedNum', width: "20%", align: "center"},
                    {name: 'intoTime', index: 'intoTime', width: "20%", align: "center"},
                    {name: 'other', index: 'other', width: "20%", align: "center"},
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#chooseModule-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#chooseModule-list").setGridWidth($("#configuration-cart").width() - 10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div className="configuration">
                <div className="configuration-top">
                    累计：<span>120</span>
                </div>
                <div id="configuration-cart">
                    <Details visible={this.state.visible} cartId="#chooseModule-list"
                             changeState={this.changeState.bind(this)}/>
                    <table id="chooseModule-list"></table>
                    <div id="chooseModule-page"></div>
                </div>
            </div>
        )
    }
}
