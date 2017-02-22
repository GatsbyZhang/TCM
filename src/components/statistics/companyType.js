import React from 'react'
// import Highcharts from 'highcharts'

export default  class CompanyType extends React.Component {

    randerChart = () => {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'componentTypeContainer',
                type: 'pie'
            },
            title: {
                text: "单位类别分布"
            },
            credits: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:0.1f}%',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '合计',
                data: [
                    ['发货单位', 45.0],
                    ['收货单位', 26.8],
                    ['租赁单位', 28.2]
                ]
            }]
        })
    }

    componentDidMount() {
        this.randerChart()
    }

    componentDidUpdate() {
        this.randerChart()
    }

    render() {
        return (
            <div
                id="componentTypeContainer"
                className="chart-box">

            </div >
        )
    }
}