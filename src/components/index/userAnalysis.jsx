/*
 * 首页用户分析组件
 * */
import React, {Component, PropTypes} from 'react'
import {Iconu, Select, DatePicker} from 'antd'
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
export default class Analysis extends Component {
    state = {
        xAxis: "近24小时",
        xTime: "时"
    }
    /*下拉选择改变触发事件*/
    selectChange(value) {

        switch (value) {
            case "0":
                this.setState({xAxis: "近24小时", xTime: "时"})
                break
            case "1":
                this.setState({xAxis: "近七天", xTime: "日"})
                break
            case "2":
                this.setState({xAxis: "当月", xTime: "日"})
                break
            case "3":
                this.setState({xAxis: "当季", xTime: "月"})
                break
            case "4":
                this.setState({xAxis: "月份", xTime: "月"})
                break
            default:
                return false
        }
        this.props.indexCart(value)
    }

    componentDidUpdate(prevProps) {
        if(prevProps===this.props){
            return;
        }
        const {cartData} = this.props
        let arrData = Object.values(cartData)
        let xTime = this.state.xTime
        arrData.sort((a, b) => parseInt(a.Rq) - parseInt(b.Rq))
        arrData.forEach((item) => item.Rq = parseInt(item.Rq) + " " + xTime)
        $('.analysis-cart').highcharts({
            chart: {
                type: 'line'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '用户分析图'
            },
            xAxis: {
                title: {
                    text: `时间（${this.state.xAxis}）`
                },
                categories: arrData.map((item) => item.Rq)
            },
            yAxis: {
                title: {
                    text: '用户数量(人)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: '在线用户',
                data: arrData.map((item) => item.AddUserNum)
            }, {
                name: '新增用户',
                data: arrData.map((item) => item.OnlineUserNum)
            }]
        })
        $('#user-table').GridUnload();
        $("#user-table").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: arrData,
            height: "auto",
            autowidth: true,//自动宽
            colNames: [`时间（${this.state.xAxis}）`, '新增用户(人)', '在线用户(人)', '运输方量(立方)', '运输车次(次)'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'Rq', index: 'Rq', width: "25%", align: "center", sorttype: "int"},
                {name: 'AddUserNum', index: 'AddUserNum', width: "20%", align: "center", sorttype: "int"},
                {name: 'OnlineUserNum', index: 'OnlineUserNum', width: "20%", align: "center", sorttype: "int"},
                {name: 'TransportCs', index: 'TransportCs', width: "15%", align: "center", sorttype: "int"},
                {name: 'TransportNum', index: 'TransportNum', width: "15%", align: "center", sorttype: "int"}
            ],
            rowNum: 7,//一页显示多少条
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            pager: $('#user-page'),//表格页脚的占位符(一般是div)的id
            viewrecords: true,//显示记录总数
        })
        $(window).resize(function () {//表格自适应屏幕
            $("#user-table").setGridWidth($(".analysis-table").width() - 10)
        })
    }

    componentDidMount() {
        this.props.indexCart(0)
    }

    render() {
        const select = (
            <Select defaultValue="0" onChange={this.selectChange.bind(this)}>
                <Option value="0">日</Option>
                <Option value="1">周</Option>
                <Option value="2">月</Option>
                <Option value="3">季</Option>
                <Option value="4">年</Option>
            </Select>
        )
        return (
            <div className="analysis">
                <div className="analysis-top">
                    {select}
                    <RangePicker format="YYYY-MM-DD"/>
                </div>
                <div className="analysis-cart"></div>
                <div className="analysis-table">
                    <table id="user-table"></table>
                    <div id="user-page"></div>
                </div>
            </div>
        );
    }
}