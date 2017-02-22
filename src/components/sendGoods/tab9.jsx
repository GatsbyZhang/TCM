import React, {Component} from 'react';
import compactData from './compactData.js';
import SendSelfcarDetail from './../carsManagement/carsDetail.jsx';
import BrkdwnRecord from './../carsManagement/brkdwnRecord.jsx'
import { Popconfirm, message,Modal } from 'antd';
class Tab9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brkRecordVisible: false,
            sendSelfVisible: false
        }
    }
    componentDidMount(){
        const _this=this;
        $("#sendGoods-list9").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: compactData.rows,
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '车号', '车牌号','规格','当前驾驶员','故障次数','状态'],
            colModel: [
                {name: 'id', index: 'id', width: '10%', align: 'center'},
                {name: 'aCount', index: 'aCount', width: '20%', align: 'center'},
                {name: 'number', index: 'number', width: '20%', align: 'center',sortable: false},
                {name: 'style', index: 'style', width: '10%', align: "center"},
                {name: 'name', index: 'name', width: '20%', align: "center", sortable: false,
                    formatter:function(cellvalue,options,rowObject){
                        return '<select>' +
                            '<option value="驾驶员1">驾驶员1</option>' +
                            '<option value="驾驶员2">驾驶员2</option>' +
                            '<option value="驾驶员3">驾驶员3</option>' +
                            '</select>'
                    }},
                {name: 'cCount', index: 'cCount', width: '10%', align: "center",sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        let rowid = rowObject.id;
                        return `<span class="breakdown" id="send-brkdwn-${rowid}">${cellvalue}</span>`
                    }},
                {name: 'state', index: 'state', width: '10%', align: "center",sortable: false,
                    formatter:function(cellvalue,options,rowObject){
                        return '正常';
                    }},
            ],
            rownumbers: false,//添加左侧行号
            //altRows:true,//设置为交替行表格,默认为false
            //sortname:'createDate',
            //sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            localReader: {
                root: compactData.rows,
                // id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#sendGoods-gridPager9'),
            loadError: function () {
              
            },
            loadComplete: function (data) {
                let idArr = $("#sendGoods-list9").jqGrid('getDataIDs');

                for(var i in idArr){
                    let row = $("#sendGoods-list9").jqGrid('getRowData',i);
                    $("#send-brkdwn-"+row.id).bind('click',function () {
                        //todo:传对应的车号id
                        _this.showBrkRecord(row.number)
                    });
                }
            },
            ondblClickRow:function (rowid) {
                _this.showModel(rowid)
            },
        });
        require('COMMON/rightkeys')( this.showModel.bind(this))
    }
    showBrkRecord(id){
        this.setState({
            brkRecordVisible:false,
            brkdwnId:id,
        })
        
    }
    
    handleCancel() {
        this.setState({
            sendSelfVisible:false,
            brkRecordVisible:false,
        })
    }

    showModel(id) {
        const {actions, sendGoodsTodos}=this.props;
        actions.fetchCarDetail(id);
        this.setState({
            sendSelfVisible:true,
            brkdwnId:id,
        })
    }
    render() {
        const { sendGoodsTodos,carMngTodos}=this.props;
        return <div>
            <table id="sendGoods-list9">
            </table>
            <div id="sendGoods-gridPager9"></div>
            <Modal title="自有车辆" visible={this.state.sendSelfVisible}
                   onOk={this.handleCancel.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
                   footer={null}
            >
                <SendSelfcarDetail {...this.props}/>
            </Modal>

            <Modal title="故障记录" visible={this.state.brkRecordVisible}
                   onOk={this.handleCancel.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
                   footer={null}
            >
                <BrkdwnRecord {...this.props} brkdwnId={this.state.brkdwnId}/>
            </Modal>
        </div>
    }
}
export default Tab9;