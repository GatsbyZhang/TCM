import React, {Component} from 'react';
class Tab3 extends Component {
    componentDidMount(){
        let compactData=this.props.sendGoodsTodos.compactData.rows;
        let that=this;
        let unitId=that.props.sendGoodsTodos.sid;
        $("#sendGoods-list3").jqGrid({
            url: `http://192.168.1.67:8889/SUnitManage/RecvUnits?userid=${sessionStorage.UserId}&unitId=${unitId}`,
            datatype: "json",
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '单位名称', '联系人','电话','合同数','累计车数','累计方数'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'UnitId', index: 'UnitId', width: '10%', align: 'center'},
                {name: 'matching', index: 'matching', width: '20%', align: 'center',},
                {name: 'name', index: 'name', width: '20%', align: 'center',sortable: false},
                {name: 'telNumber', index: 'telNumber', width: '10%', align: "center"},
                {name: 'cCount', index: 'cCount', width: '15%', align: "center",sortable: false},
                {name: 'aCount', index: 'aCount', width: '20%', align: "center", sortable: false,},
                {name: 'aFCount', index: 'aFCount', width: '15%', align: "center",sortable: false},
            ],
            prmNames : {
                page:null,    // 表示请求页码的参数名称
                rows:null,    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search:null, // 表示是否是搜索请求的参数名称
                nd:null, // 表示已经发送请求的次数的参数名称
                id:"UnitId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper:"del", // 当在delete模式中提交数据时，操作的名称
                subgridid:null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows:null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            rownumbers: false,//添加左侧行号
            //altRows:true,//设置为交替行表格,默认为false
            sortname:'UnitId',
            sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            jsonReader: {
                root: (obj)=>{
                    console.log('>>>>>>>>>>>>>>>>>>>>obj',obj)
                    return obj.resultData.users;
                },   // json中代表实际模型数据的入口
                // page: (obj)=>obj.resultData.CurrentPageIndex+1,   // json中代表当前页码的数据
                // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                // records: "obj.resultData.TotalRecordCount", // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
            },
            pager: $('#sendGoods-gridPager3'),
            ondblClickRow:function(id, iRow, iCol, e){
                let row = $("#sendGoods-list3").jqGrid('getLocalRow', id);//返回原始json数据
                that.props.actions.toggleSendGoodsModel(row.id);
            },
        });
        require('COMMON/rightkeys')(that.props.actions.toggleSendGoodsModel);//自定义右键功能
    }
    render() {
        return <div>
            <table id="sendGoods-list3">
            </table>
            <div id="sendGoods-gridPager3"></div>
        </div>
    }
}
export default Tab3;