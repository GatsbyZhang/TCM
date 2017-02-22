/*
 * 内嵌表格
 * */
import React, {Component, PropTypes} from 'react'
export default class Detail extends Component {

    generaCart(id) {
        const select = '<select>' +
            '<option value ="1" selected>表名一</option>' +
            '<option value ="2">表名一</option>' +
            '<option value="3">表名一</option>' +
            '<option value="4">表名一</option>' +
            '<option value="5">表名一</option>' +
            '</select> '
        $("#" + id).jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 800,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', 'ERP记录表', '字段', '代码', '砼车对应表名', '对应字段', '代码', '接入/推送'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'name', index: 'name', width: "15%", align: "center"},
                    {name: 'amount', index: 'amount', width: "10%", align: "center"},
                    {name: 'otherThing', index: 'otherThing', width: "15%", align: "center"},

                    {
                        name: 'otherThing', index: 'otherThing', width: "14%", align: "center",
                        formatter: function () {
                            return select
                        }
                    },
                    {
                        name: 'otherThing', index: 'otherThing', width: "11%", align: "center",
                        formatter: function () {
                            return select
                        }
                    },
                    {name: 'otherThing', index: 'otherThing', width: "15%", align: "center"},
                    {
                        name: 'otherThing', index: 'otherThing', width: "10%", align: "center",
                        formatter: function () {
                            return select
                        }
                    },
                ],
                sortable: true,
                rowNum: 3,//一页显示多少条
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
            })
    }

    componentDidMount() {
        this.generaCart(this.props.cartId)
    }

    render() {
        return (
            <div id="inner-cart">
                <table id={this.props.cartId}></table>
            </div>
        )
    }

}