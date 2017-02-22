import React from 'react';
import CarsDetail from './carsDetail.jsx'
import Brkdwndetail from './breakdownDetail.jsx'
import 'COMMON/rightkeys'
import {Tabs, Button, Select, Option, Tag, Modal} from 'antd';
import severRoot from '../../redux/constants/index'

const TabPane = Tabs.TabPane;

export default class Breakdown extends React.Component {
    
    breakdownData = ()=> {
        let _this=this;
        const {carMngTodos}=this.props;
        $("#breakdownRecord-table").jqGrid({
            url: severRoot + `VehicleManage/HitchRecords?userid=${sessionStorage.UserId}`,
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            jsonReader: {
                root: function (obj) {
                    return obj.resultData.records.filter(function(e){
                        return e.Id==_this.props.brkdwnId;
                    });
                },
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total: (obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "Id",
            },
            colNames: ["序号", "车牌号", "品牌", "规格", "单位名称", "当前驾驶员", "电话", "故障时间", "故障类别"],
            colModel: [
                {name: "Id", index: "Id", width: 100, align: "center", sortable: true},
                {name: "V_NO", index: "V_NO", width: 100, align: "center", sortable: false},
                {name: "VBrand", index: "VBrand", width: 100, align: "center", sortable: false},
                {name: "VPlateNumber", index: "VPlateNumber", width: 100, align: "center", sortable: true},
                {name: "UnitName", index: "UnitName", width: 100, align: "center", sortable: false},
                {name: "UName", index: "UName", width: 100, align: "center", sortable: false},
                {name: "UPhone", index: "UPhone", width: 100, align: "center", sortable: false},
                {
                    name: "OccurTimeStamp", brkDate: "OccurTimeStamp", width: 100, align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        return new Date(parseInt(cellvalue) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                    }
                },
                {name: "TypeType", brkType: "TypeType", width: 100, align: "center", sortable: false},

            ],
            prmNames : {
                page:"pageIndex",    // 表示请求页码的参数名称
                rows:"pageSize",    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search:null, // 表示是否是搜索请求的参数名称
                nd:null, // 表示已经发送请求的次数的参数名称
                id:"Id", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper:"del", // 当在delete模式中提交数据时，操作的名称
                subgridid:null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows:null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            sortname:"Id",
            sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: 20,//每页显示记录数
            rowList: [20, 30],//用于改变显示行数的下拉列表框的元素数组。
            pager: $('#brkRecordPager'),

        });
    };

    componentDidMount() {
        this.breakdownData();
    };

    render() {
        const {carMngTodos}=this.props;
        return <div className="cars-breakdown">
            <table id="breakdownRecord-table">
            </table>
            <div id="brkRecordPager"></div>
        </div>
    }
}