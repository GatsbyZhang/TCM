import React,{Component} from 'react';
import './index.scss';
import ModalList2 from './modalList2.jsx';
import ModalList3 from './modalList3.jsx';
import Merger from './merge.js';
import {Icon,Button} from 'antd';

class UserLink extends Component{
    componentDidMount(){
        let userDatas=this.props.matchingTodos.userDatas;
        const that = this;
        $("#matching-list3").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: userDatas,
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', '用户', '匹配单位', '操作'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'id', index: 'id', width: '10%', align: 'center'},
                {
                    name: 'user', index: 'user', width: '25%', align: 'center',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //合并单元格
                        return 'id=\'user' + rowId + "\'";
                    },
                },
                {
                    name: 'matching', index: 'matching', width: '45%', align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        var display=rowObject.del?'display:block':'display:none';
                        return  '<p>'+rowObject.company+'   '+rowObject.name+'   '+rowObject.telNumber+'   <label class="watch'+rowObject.id+'" style="'+display+';color:blue;">查看人员</label></p>';
                    },
                },
                {
                    name: 'del', index: 'del', width: '20%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return " <Button type='primary' id='button'>匹配</Button>"
                    },
                    cellattr: function (rowId, tv, rowObject, cm, rdata) {
                        return 'id=\'del' + rowId + "\'";
                    },
                }
            ],
            rownumbers: false,//添加左侧行号
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            multiselect: true, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            localReader: {
                root: userDatas,
                id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#matching-gridPager3'),
            gridComplete: function () {
                //②在gridComplete调用合并方法
                var gridName = "matching-list3";
                Merger(gridName, 'user');
                Merger(gridName, 'del');
               let target=$("#matching-list3");
                $('#button').click(function(){
                    let rowIds =target .jqGrid('getGridParam', 'selarrrow');
                    let items=[];
                    $(rowIds).each(function (index, id){
                        //由id获得对应数据行
                        let row = $("#matching-list3").jqGrid('getRowData', id);
                        items.push(row.id)
                    });
                    that.props.matchingAction.changeUserDetail(items);
                    target[0].addJSONData(that.props.matchingTodos.userDatas); //重新传入数据填充表格
                });
                let mya = target.getDataIDs();
                for(var i=0;i<mya.length;i++){
                    let row = $("#matching-list3").jqGrid('getLocalRow', i);//返回原始json数据
                    $(".watch"+row.id).click(function(){
                        that.props.matchingAction.toggleMatching1UserModel2(row.company);
                        $("#matching-list4")[0].addJSONData(that.props.matchingTodos.userDatas.filter(item=>{
                            return item.company==row.company;
                        })); //重新传入数据填充表格
                    })
                }
            },
            ondblClickRow: function (id, iRow, iCol, e) {
                if (iCol == 2) {
                    that.props.matchingAction.toggleMatching1UserModel(id);
                }
            },
        });
    }
    render(){
        return <div>
            <table id="matching-list3" >
            </table>
            <div id="matching-gridPager3"></div>
            <ModalList2 {...this.props}/>
            <ModalList3 {...this.props}/>
        </div>
    }
}
export default UserLink;