import React from 'react';
import Brkdwndetail from './breakdownDetail.jsx'
import 'COMMON/rightkeys'
import {Tabs, Button, Select, Option, Tag, Modal} from 'antd';
import severRoot from '../../redux/constants/index'

const TabPane = Tabs.TabPane;

export default class Breakdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brkVisible: false
        }
    }

    //TODO：数据显示及后续处理

    breakdownData = ()=> {
        let _this = this;
        $("#breakdown-table").jqGrid({
            url: severRoot + `VehicleManage/HitchRecords?userid=${sessionStorage.UserId}`,
            datatype: "json",
            mtype: "Get",//提交方式
            height: 'auto',//高度，表格高度。可为数值、百分比或'auto'
            width: 1000,//这个宽度不能为百分比
            autowidth: true,//自动宽
            jsonReader: {
                root: (obj)=>obj.resultData.records,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total: (obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "VehicleId",
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
            rowNum: 20,//每页显示记录数
            viewrecords: true,//是否在浏览导航栏显示记录总数
            pager: $('#breakdownPager'),
            sortable: true,
            ondblClickRow: function (id) {
                _this.showModel(id,{type:"show"})
            },
            loadComplete: function (xhr) {
                console.log("brk>>》》》》>", xhr)
            }

        });     function copy() {
            //todo:刷新数据
            $("#breakdown-table").trigger("reloadGrid")
        }

        require('COMMON/rightkeys')(_this.showModel.bind(_this),copy.bind(_this));//自定义右键功能

    };

    handleOk() {
        this.setState({
            brkVisible: false
        })
    }

    handleCancel() {
        this.setState({
            brkVisible: false
        })
    }

    showModel(id,json) {
        const {actions}=this.props;
        actions.fetchBrkdwnDetail(id);
        actions.fetchCarDetail(id);
        this.setState({
            brkVisible: true,
            type:json.type
        })
    }

    componentDidMount() {
        this.breakdownData();
    };

    render() {
        const {carMngTodos}=this.props;
        return <div className="cars-all">
            <div>

                <div className="options">
                    <span>选择:____</span>
                    <span>累计：26</span>
                </div>
                <table id="breakdown-table">
                </table>
                <div id="breakdownPager"></div>
                <Modal title="故障详情" visible={this.state.brkVisible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       width="1000px"
                       okText={this.state.type=='add'?"新增":"修改"}
                       cancelText="取消"
                >
                    <Brkdwndetail {...this.props}/>
                </Modal>
            </div>
        </div>
    }
}