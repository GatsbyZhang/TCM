/*
* 用户操作记录表
* */
import React, {Component, PropTypes} from 'react'
export  default class UserOption extends Component {

    componentDidMount() {
        $("#userOption-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 850,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['序号', '操作人', '操作对象', '操作', '操作时间', '撤销'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'operater', index: 'optioner', width: "10%", align: "center"},
                    {name: 'operateObj', index: 'optionObj', width: "20%", align: "center"},
                    {name: 'operate', index: 'option', width: "10%", align: "center"},
                    {name: 'operateDate', index: 'optionDate', width: "20%", align: "center"},
                    {
                        name: 'cancel', index: 'cancel', width: "10%", align: "center", formatter: function () {
                        return '<button class="cancel">撤销</button>'
                    }
                    },
                ],
                sortable: true,
                rowNum: 10,//一页显示多少条
                pager: '#userOption-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                autowidth:true,
                gridComplete:function () {
                    $('button.cancel').click(function () {
                        let rowid = $("#userOption-list").jqGrid("getGridParam", "selrow")//所选择的行id
                        $("#userOption-list").jqGrid('delGridRow', rowid,{left:800,top:200});
                    })
                }
            })
        $(window).resize(function () {//表格自适应屏幕
            $("#userOption-list").setGridWidth($("#userOption-cart").width() - 10)
        });
    }
    render() {
        return (
            <div id="userOption-cart">
                <table id="userOption-list"></table>
                <div id="userOption-page"></div>
            </div>
        )
    }
}