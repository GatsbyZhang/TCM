import React from "react"
// import Highcharts from "highcharts"

export default  class CompanyType extends React.Component {

    randerChart = () => {

        const {staticTodos}=this.props;
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: "componentNumberContainer",
                type: "line"
            },
            credits: {
                enabled: false
            },
            title: {
                text: "单位个数",
                x: -20 //center
            },
            xAxis: {
                categories: staticTodos.toggleName
            },
            yAxis: {
                title: {
                    text: "个数（家）"
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: "#808080"
                }]
            },
            tooltip: {
                valueSuffix: "家"
            },
            legend: {
                align: "center",
                verticalAlign: "bottom",
                borderWidth: 0
            },
            series: [{
                name: "发货",
                data: staticTodos.toggleData[0]
            }, {
                name: "收货",
                data: staticTodos.toggleData[1]
            }, {
                name: "租赁",
                data: staticTodos.toggleData[2]
            }]
        });
    };

    componentDidMount() {
        const {staticTodos, actions}=this.props;
        this.randerChart()
    }

    componentDidUpdate() {
        this.randerChart()
    }

    render() {
        return (
            <div
                id="componentNumberContainer"
                className="chart-box">

            </div >
        )
    }
}