/*
 * 发货合同表格组件
 * */
import React, {Component, PropTypes} from 'react'
import Details from './detail'
export  default class DevCompact extends Component {
    constructor(props) {
        super(props);
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
            '<option value ="1" selected>全自动签收</option>' +
            '<option value ="2">驾驶员确认到达并签收</option>' +
            '<option value="3">签收员确认到达并签收</option>' +
            '<option value="4">自动到达-驾驶员签收</option>' +
            '<option value="5">自动到达-签收员签收</option>' +
            '<option value="6">驾驶员确认到达-自动签收</option>' +
            '<option value="7">驾驶员确认到达-签收员签收</option>' +
            '<option value="8">签收员确认到达-驾驶员签收</option>' +
            '<option value="9">签收员确认到达-自动签收</option>' +
            '</select> '

        $("#devCompact-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '合同编号', '合同单位', '联系人', '电话','开始时间','结束时间','签收规则'],//jqGrid的列显示名字
                colModel: [
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'contractNum', index: 'contractNum', width: "10%", align: "center"},
                    {name: 'contractUnit', index: 'contractUnit', width: "15%", align: "center"},
                    {name: 'linkMan', index: 'linkMan', width: "10%", align: "center"},
                    {name: 'telephone', index: 'telephone', width: "15%", align: "center"},
                    {name: 'startDate', index: 'startDate', width: "15%", align: "center"},
                    {name: 'endDate', index: 'endDate', width: "10%", align: "center"},
                    {
                        name: 'rule', index: 'rule', width: "20%", align: "center", formatter: function () {
                        return select
                      }
                    },

                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pgtext: '第{0}页   共 {1} 页',
                pager: '#devCompact-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#devCompact-list").setGridWidth($("#compact-cart").width() - 10)
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
                    <Details innerCartId="dev-cart-list" visible={this.state.visible} cartId="#devCompact-list"
                             changeState={this.changeState.bind(this)}/>
                    <table id="devCompact-list"></table>
                    <div id="devCompact-page"></div>
                </div>
            </div>
        )
    }
}
