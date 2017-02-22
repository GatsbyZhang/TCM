/*
* 工程任务
* */
import React, {Component, PropTypes} from 'react'
import TaskDetail from './detail/taskDetail'
export  default class ProTask extends Component {
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

        $("#proTask-list").jqGrid(
            {
                url: '/static/JSONData.json',//组件创建完成之后请求数据的url
                width: 1200,
                height: "auto",
                datatype: "json",//请求数据返回的类型。可选json,xml,txt
                colNames: ['任务单编号', '合同单位', '工程名称', '砼品种', '浇筑部位', '签收规则', '状态'],//jqGrid的列显示名字
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', index: 'id', width: "10%", align: "center"},
                    {name: 'contractUnit', index: 'contractUnit', width: "15%", align: "center"},
                    {name: 'projectName', index: 'projectName', width: "15%", align: "center"},
                    {name: 'kinds', index: 'kinds', width: "10%", align: "center"},
                    {name: 'address', index: 'address', width: "10%", align: "center"},
                    {
                        name: 'rule', index: 'rule', width: "20%", align: "center", formatter: function () {
                        return select
                      }
                    },
                    {name: 'state', index: 'state', width: "10%", align: "center"},
                ],
                sortable: true,
                rowNum: 20,//一页显示多少条
                pager: '#proTask-page',//表格页脚的占位符(一般是div)的id
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                viewrecords: true,
                ondblClickRow: function () {
                    change({visible: true})
                }
            })
        $(window).resize(function(){//表格自适应屏幕
            $("#proTask-list").setGridWidth($("#proTask-cart").width()-10)
        });
        require('COMMON/rightkeys')(this.changeState.bind(this))
    }

    render() {
        return (
            <div id="proTask-cart">
                <TaskDetail visible={this.state.visible} cartId="#proTask-list" changeState={this.changeState.bind(this)}/>
                <table id="proTask-list"></table>
                <div id="proTask-page"></div>
            </div>
        )
    }
}
