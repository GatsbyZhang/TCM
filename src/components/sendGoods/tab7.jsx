import React, {Component} from 'react';
import TransportDetail from './transportDetail.jsx';
import severRoot from '../../redux/constants/index'

class Tab7 extends Component {
    componentDidMount(){
        let compactData=this.props.sendGoodsTodos.compactData.rows;
        let that=this
        let unitId=that.props.sendGoodsTodos.sid;
        const {searchTodos}=this.props;
        $("#sendGoods-list7").jqGrid({
            url: severRoot+`SUnitManage/TicketList?unitId=${unitId}&orderBy=TicketId&order=asc&userid=${sessionStorage.UserId}`,
            datatype: "json", //数据来源，本地数据
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号','编号', '合同单位', '工程名称','本车方量','签收方量','驾驶员','驾驶员电话','签收规则','状态'],
            colModel: [
                {name: 'TicketId', index: 'TicketId', width: '10%', align: 'center'},
                {name: 'TicketNo', index: 'TicketNo', width: '10%', align: 'center'},
                {name: 'UnitName', index: 'UnitName', width: '15%', align: 'center',sortable: false},
                {name: 'ProName', index: 'ProName', width: '20%', align: 'center',sortable: false},
                {name: 'SendNum', index: 'SendNum', width: '10%', align: "center",sortable: false},
                {name: 'SignNum', index: 'SignNum', width: '10%', align: "center",sortable: false},
                {name: 'DriverName', index: 'DriverName', width: '10%', align: "center", sortable: false,},
                {name: 'DriverPhone', index: 'DriverPhone', width: '10%', align: "center", sortable: false,},
                {name: 'ReceiveRule', index: 'ReceiveRule', width: '15%', align: "center",sortable: false,},
                {name: 'TStatus', index: 'TStatus', width: '10%', align: "center",sortable: false,
                    formatter:function(cellvalue,options,rowObject){
                        return '<select>' +
                            '<option value="出发">出发</option>' +
                            '<option value="到达">到达</option>' +
                            '<option value="返回">返回</option>' +
                            '</select>'
                    }},
            ],
            jsonReader : {
                root: (obj)=>obj.resultData.users,   // json中代表实际模型数据的入口
                // page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                // records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "TicketId",
            },
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
                root: compactData,
                id: "number",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#sendGoods-gridPager7'),
            ondblClickRow:function(id, iRow, iCol, e){
                let row = $("#sendGoods-list7").jqGrid('getLocalRow', id);//返回原始json数据
                that.props.actions.transportDetailModelList(row.id);
            },
            loadComplete: function (xhr) {
                console.log(">>>>>>>>>",xhr)
                $("#sendGoods-list7").jqGrid('setSelection',searchTodos.rowId);
            },
        });
        require('COMMON/rightkeys')(that.props.actions.transportDetailModelList);//自定义右键功能
    }
    render() {
        return <div>
            <table id="sendGoods-list7">
            </table>
            <div id="sendGoods-gridPager7"></div>
            <TransportDetail {...this.props} />
        </div>
    }
}
export default Tab7;