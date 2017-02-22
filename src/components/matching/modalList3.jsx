/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Table, Icon,Button, Modal,} from 'antd';
const {Column, ColumnGroup} = Table;


class TableList3 extends Component {
    componentDidMount(){
        let that = this;
        var root=that.props.matchingTodos;
        var userDatas=root.userDatas;
        var word=root.word;
        var myData=userDatas.filter(item=>{
            return item.company==word;
        });
        $("#matching-list4").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: myData,
            mtype: "GET",//提交方式
            height:" auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['编号', '姓名', '联系电话', '单位名称','注册时间','在线时长','用户角色','状态'],
            colModel: [
                {name: 'number', index: 'number', width: '10%', align: 'center'},
                {name: 'name', index: 'name', width: '10%', align: 'center',},
                {name: 'telNumber', index: 'telNumber', width: '15%', align: "center",},
                {name: 'company', index: 'company', width: '15%', align: "center", sortable: false,},
                {name: 'startDate', index: 'startDate', width: '15%', align: "center",},
                {name: 'hour', index: 'hour', width: '15%', align: "center",},
                {name: 'role', index: 'role', width: '10%', align: "center",},
                {name: 'state', index: 'state', width: '10%', align: "center",
                formatter(cellValue,options,rowObject){
                    if(cellValue==true){
                        return '在线';
                    }
                    else{
                        return '离线';
                    }
                }},
            ],
            rownumbers: false,//添加左侧行号
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            multiselect: true, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            localReader: {
                root: myData,
                id: "blackId",//设置返回参数中，表格ID的名字为blackId
                repeatitems: false,
            },
            pager: $('#matching-gridPager4'),
        });
    }
    render() {
        return <div>
                <table id="matching-list4" >
                </table>
                <div id="matching-gridPager4"></div>
           </div>
    }
}



class ModalList3 extends Component {
    handleModal() {
        this.props.matchingAction.toggleMatching1Model(0);
    }

    handleCancel() {
        this.props.matchingAction.closeMatchingModal();
    }
    render() {
        var state = this.props.matchingTodos;
        return <div>
            <Modal title="单位人员信息" visible={state.userVisible2} width="1200px"
                   onOk={this.handleModal.bind(this)} onCancel={this.handleCancel.bind(this)} okText="保存"
                   cancelText="取消">
               <TableList3 {...this.props} />
            </Modal>
        </div>
    }
}
export  default ModalList3;