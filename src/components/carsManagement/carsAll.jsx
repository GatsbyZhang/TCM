import React from 'react';
import CarsDetail from './carsDetail.jsx'
import BrkdwnRecord from './brkdwnRecord.jsx'
import severRoot from '../../redux/constants/index'

import 'COMMON/rightkeys'
import {Tabs, Button, Select, Tag, Modal, Tooltip} from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
export default class CarsAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            carVisible: false,
            brkRecordVisible: false
        }
    }
    //TODO：点击故障次数弹出故障记录

    carsAllData() {
        let _this = this;
        const {searchTodos}=this.props;
        $("#cars-table").jqGrid({
            url: severRoot+`VehicleManage/List?userid=${sessionStorage.UserId}`,
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            colNames: ["序号", "车号", "车牌号", "规格号", "当前驾驶员", "故障次数", "状态"],
            colModel: [
                {name: "VehicleId", index: "VehicleId", width: 100, align: "center", sortable: true},
                {name: "V_NO", index: "V_NO", width: 100, align: "center", sortable: false},
                {name: "VPlateNumber", index: "VPlateNumber", width: 100, align: "center", sortable: false},
                {name: "VGgxh", index: "VGgxh", width: 100, align: "center", sortable: false},
                {
                    name: "UName",
                    index: "UName",
                    editable: true,
                    edittype: "select",
                    editrules: true,
                    // formatter: 'select',
                    editoptions: {value: {'请选择驾驶员': '请选择驾驶员'}},
                    //todo:获取所有可选的驾驶员
                    formatter: function (cellvalue, options, rowObject) {
                        return `<Select defaultValue="${cellvalue}"} ><Option value="张三">张三</Option>
                            <Option value="李四">李四</Option>
                            <Option value="王五">王五</Option>
                            <Option value="贵顺">贵顺</Option>
                            </Select >`
                    },
                    width: 100,
                    align: "center",sortable: false
                },
                {
                    name: "hitchCount", index: "hitchCount", width: 100, align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        let rowid = rowObject.VehicleId;
                        return `<span class="breakdown" id="brkdwn-${rowid}">${cellvalue}</span>`
                    }
                },
                {
                    name: "VStatus", index: "VStatus", width: 100, align: "center", sortable: false,
                    editable: true,
                },
            ],
            jsonReader : {
                root: (obj)=>obj.resultData.vehicles,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "VehicleId",
            },
            sortname:"VehicleId",
            sortorder:'asc',
            prmNames : {
                page:"pageIndex",    // 表示请求页码的参数名称
                rows:"pageSize",    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search:null, // 表示是否是搜索请求的参数名称
                nd:null, // 表示已经发送请求的次数的参数名称
                id:"VehicleId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper:"del", // 当在delete模式中提交数据时，操作的名称
                subgridid:null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows:null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: 20,//每页显示记录数
            pager: $('#gridPager'),
            sortable: true,
            ondblClickRow: function (id) {
                _this.showModel(id,{type:"show"})
            },
            loadComplete: function (xhr) {
                console.log("carsAll>>》》》》>",xhr)
                let idArr = $("#cars-table").jqGrid('getDataIDs');

                for (var i in idArr) {
                    $("#brkdwn-" + idArr[i]).bind('click', function () {
                        _this.showBrkRecord(idArr[i],{type:"show"})
                    });
                }
                $("#cars-table").jqGrid('setSelection',searchTodos.rowId);
            },
        });
        function copy() {
            //todo:刷新数据
            $("#cars-table").trigger("reloadGrid")
        }

        require('COMMON/rightkeys')(_this.showModel.bind(_this),copy.bind(_this));//自定义右键功能

    };

    handleOk() {
        this.setState({
            carVisible:false,
            brkRecordVisible:false,
        });
    }

    handleCancel() {
        this.setState({
            carVisible:false,
            brkRecordVisible:false,
        });
    }

    showModel(carId,json) {
        const {actions}=this.props;
        // actions.fetchCarDetail(carId);
        this.setState({
            carVisible:true,
            type:json.type
        });
    }

    showBrkRecord(id) {

        const {actions, carMngTodos}=this.props;
        actions.fetchBrkdwnDetail(id);//获取当前车辆的故障详情
        actions.fetchCarDetail(id);//获取当前车辆的详情
        this.setState({
            brkRecordVisible:true,
            brkdwnId:id,
        });
    }
    componentDidMount() {
        this.carsAllData();
    };
    render() {
        return <div className="cars-all">
            <div>
                <div className="options">
                    <span>选择:____</span>
                    <span>累计：26</span>
                </div>
                <table id="cars-table">
                </table>
                <div id="gridPager"></div>
                <Modal title="车辆详情" visible={this.state.carVisible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       id="car-detail-model" width="1000px"
                       okText={this.state.type=='add'?"新增":"修改"}
                       cancelText="取消"
                >
                    <CarsDetail {...this.props}/>
                </Modal>
                <Modal title="故障记录" visible={this.state.brkRecordVisible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       width="1180px"
                >
                    <BrkdwnRecord {...this.props} brkdwnId={this.state.brkdwnId}/>
                </Modal>
            </div>
        </div>
    }
}