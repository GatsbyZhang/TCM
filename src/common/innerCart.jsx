/*
 * 内嵌表格
 * */
import React, {Component, PropTypes} from 'react'
export default class Detail extends Component {

    generaCart(id){
        $("#"+id).jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 600,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '名称', '数量', '备注'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "25%", align: "center"},
                    {name: 'name', index: 'name', width: "25%", align: "center"},
                    {name: 'amount', index: 'amount', width: "25%", align: "center"},
                    {name: 'otherThing', index: 'otherThing', width: "25%", align: "center"},
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