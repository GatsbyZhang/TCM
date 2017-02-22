import React, {Component} from 'react';
import TaskDetail from './taskDetail.jsx';
import severRoot from '../../redux/constants/index'
class Tab6 extends Component {
    componentDidMount(){
        let compactData=this.props.sendGoodsTodos.compactData.rows;
        let that=this;
        let unitId=that.props.sendGoodsTodos.sid;

        const {searchTodos}=this.props;
        $("#sendGoods-list6").jqGrid({
            url: severRoot+`SUnitManage/TaskList?unitId=${unitId}&orderBy=TaskId&order=asc&userid=${sessionStorage.UserId}`,
            datatype: "json", //数据来源，本地数据
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号','任务单编号', '合同单位', '工程名称','砼品种','浇筑部位','签收规则','状态'],
            colModel: [
                {name:'TaskId',index:'TaskId', width:'10%', align:'center' },
                {name: 'TaskNo', index: 'TaskNo', width: '10%', align: 'center',sortable: false},
                {name: 'UnitName', index: 'UnitName', width: '20%', align: 'center',},
                {name: 'ProName', index: 'ProName', width: '20%', align: 'center',sortable: false},
                {name: 'Tpz', index: 'Tpz', width: '10%', align: "center"},
                {name: 'Jzbw', index: 'Jzbw', width: '15%', align: "center",sortable: false},
                {name: 'ReceiveRule', index: 'ReceiveRule', width: '20%', align: "center", sortable: false,},
                {name: 'Status', index: 'Status', width: '15%', align: "center",sortable: false,
                formatter:function(cellvalue,options,rowObject){
                    return '<select>' +
                        '<option value="自动">自动</option>' +
                        '<option value="驾驶员签收">驾驶员签收</option>' +
                        '<option value="签收员签收">签收员签收</option>' +
                        '</select>'
                }},
            ],
            jsonReader : {
                root: (obj)=>obj.resultData.users,   // json中代表实际模型数据的入口
                // page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                // records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "TaskId",
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
            pager: $('#sendGoods-gridPager6'),
            ondblClickRow:function(id, iRow, iCol, e){
                let row = $("#sendGoods-list6").jqGrid('getLocalRow', id);//返回原始json数据
                that.props.actions.TaskDetailModelList(row.id);
            },
            loadComplete: function (xhr) {
                console.log(">>>>>>>>>",xhr)
                $("#sendGoods-list6").jqGrid('setSelection',searchTodos.rowId);
            },
        });
        require('COMMON/rightkeys')(that.props.actions.TaskDetailModelList);//自定义右键功能
    }
    render() {
        return <div>
            <table id="sendGoods-list6">
            </table>
            <div id="sendGoods-gridPager6"></div>
            <TaskDetail {...this.props} />
        </div>
    }
}
export default Tab6;