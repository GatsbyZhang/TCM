import React, {Component} from 'react';
class Tab5 extends Component {
    componentDidMount(){
        let compactData=this.props.sendGoodsTodos.compactData.rows;
        let that=this;
        $("#sendGoods-list5").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: compactData,
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '单位名称', '联系人','电话','合同数','累计车数','累计方数'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'id', index: 'id', width: '10%', align: 'center',sortable: false},
                {name: 'matching', index: 'matching', width: '20%', align: 'center',},
                {name: 'name', index: 'name', width: '20%', align: 'center',sortable: false},
                {name: 'telNumber', index: 'telNumber', width: '10%', align: "center"},
                {name: 'cCount', index: 'cCount', width: '15%', align: "center",sortable: false},
                {name: 'aCount', index: 'aCount', width: '20%', align: "center", sortable: false,},
                {name: 'aFCount', index: 'aFCount', width: '15%', align: "center",sortable: false},
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
                root: compactData,
               // id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#sendGoods-gridPager5'),
            ondblClickRow:function(id, iRow, iCol, e){
                let row = $("#sendGoods-list5").jqGrid('getLocalRow', id);//返回原始json数据
                that.props.actions.toggleSendGoodsModel(row.id);
            },
        });
        require('COMMON/rightkeys')(that.props.actions.toggleSendGoodsModel);//自定义右键功能
    }
    render() {
        return <div>
            <table id="sendGoods-list5">
            </table>
            <div id="sendGoods-gridPager5"></div>
        </div>
    }
}
export default Tab5;