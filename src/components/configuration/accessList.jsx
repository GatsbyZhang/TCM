/*
 * 接入列表表格组件
 * */
import React, {Component, PropTypes} from 'react'
import Details from './detail/accessListDetail'
export  default class AccessList extends Component {
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
        const select = '<select>' +
            '<option value ="1" selected>启动</option>' +
            '<option value ="2">停用</option>' +
            '</select> '

        $("#accessList-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '单位名称', '接入时间', '库类型', '状态','联系人','联系电话'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'companyName', index: 'companyName', width: "15%", align: "center"},
                    {name: 'linkDate', index: 'linkDate', width: "15%", align: "center"},
                    {name: 'style', index: 'style', width: "15%", align: "center"},
                    {
                        name: 'state', index: 'state', width: "15%", align: "center", formatter: function () {
                        return select
                      }
                    },
                    {name: 'linkMan', index: 'linkMan', width: "15%", align: "center"},
                    {name: 'telePhone', index: 'telePhone', width: "15%", align: "center"},

                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#accessList-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#accessList-list").setGridWidth($("#configuration-cart").width() - 10)
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
                    <Details visible={this.state.visible} cartId="#accessList-list"
                             changeState={this.changeState.bind(this)}/>
                    <table id="accessList-list"></table>
                    <div id="accessList-page"></div>
                </div>
            </div>
        )
    }
}
