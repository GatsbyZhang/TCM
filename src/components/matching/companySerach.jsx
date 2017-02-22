/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component} from 'react';
import {Input, Icon,Button, Modal,} from 'antd';
import ModalList1 from './modalList1.jsx';
const Search = Input.Search;
const confirm = Modal.confirm;

class TableList5 extends Component {
    getSerachData(value){
        if(value){
            $("#matching-list5").jqGrid('setGridParam',{
                url:`http://192.168.1.67:8889/ExceptionMatch/GetBgAllUnitByUnitName?UnitName=${value}`,
                datatype:'json',
                page:1,
                autowidth: true,//自动宽
            }).trigger("reloadGrid");
        }
        else{
            $("#matching-list5").jqGrid('setGridParam',{
                url:`http://192.168.1.67:8889/ExceptionMatch/GetBgAllUnit`,
                datatype:'json',
                page:1,
                autowidth: true,//自动宽
            }).trigger("reloadGrid");
        }
    }
    componentDidMount(){
        let that=this;
        console.log('>>>>>>>>>>>>>>>that.props.jqUrl',that.state);
        $("#matching-list5").jqGrid({
            url: `http://192.168.1.67:8889/ExceptionMatch/GetBgAllUnit`,
            datatype: "json",
            mtype: "GET",//提交方式
            height: "auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['编号', '单位名称', '联系人', '电话','匹配'],
            colModel: [
                {name: 'UnitId', index: 'UnitId', width: '10%', align: 'center'},
                {name: 'UnitName', index: 'UnitName', width: '10%', align: 'center',},
                {name: 'UName', index: 'UName', width: '15%', align: "center",},
                {name: 'UPhone', index: 'UPhone', width: '15%', align: "center", sortable: false,},
                {name: 'del', index: 'del', width: '15%', align: "center",
                    formatter(cellValue, options, rowObject){
                        return "<button  id='subMatchingBtn1"+rowObject.UnitId+"'>匹配</button>";
                    }},
            ],
            prmNames : {
                page:false,    // 表示请求页码的参数名称
                rows:false,    // 表示请求行数的参数名称
                search:null, // 表示是否是搜索请求的参数名称
                nd:null, // 表示已经发送请求的次数的参数名称
                deloper:false, // 当在delete模式中提交数据时，操作的名称
                subgridid:null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows:null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            rownumbers: false,//添加左侧行号
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            multiselect: false, //多选框
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            jsonReader: {
                root: (obj)=>{
                    console.log('>>>>>>',obj)
                   return obj.resultData;
                },   // json中代表实际模型数据的入口
                // page: (obj)=>obj.resultData.CurrentPageIndex+1,   // json中代表当前页码的数据
                // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                // records: "obj.resultData.TotalRecordCount", // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
            },
            pager: $('#matching-gridPager5'),
            ondblClickRow:function(id, iRow, iCol, e){
                if(iCol==1){
                    that.props.matchingAction.toggleMatching1Model(id);
                }
            },
            gridComplete: function () {
                let mya =  $("#matching-list5");
                for (var i = 0; i < mya.getDataIDs().length; i++) {
                    let row = mya.jqGrid('getRowData', i + 1);//返回原始json数据
                    $("#subMatchingBtn1" + row.UnitId).click(function () {
                        //todo:后台匹配操作，并返回匹配结果
                      let ContractExceptionId=that.props.matchingTodos.ContractExceptionId;
                        that.matchingOpration({UnitId: row.UnitId, ContractExceptionId: ContractExceptionId})
                    })
                }
            }
        });
    }
    matchingOpration(index){
        confirm({
            title: '确认与ID为'+index.UnitId+'的单位进行匹配吗?',
            content: '该操作可在操作记录中撤销！',
            onOk() {
                fetch(`http://192.168.1.67:8889/ExceptionMatch/ReceiveUnitMatch?ContractExceptionId=${index.ContractExceptionId}&UnitId=${index.UnitId}`
                ).then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                    }
                ).then((json) => {
                        if (json.status == '1000') {
                            console.log('>>>>>>>>>>',json)
                            message.success('匹配成功');
                        }
                        else {
                            message.info(json.messages)
                        }
                    }
                ).catch((error) => {
                        console.error(error);
                    }
                );
            },
            onCancel() {},
        });
    }
    render() {
        return <div>
            <div>
                <Search placeholder="请输入公司名称" ref="textInput" style={{width:'300px'}} onSearch={this.getSerachData.bind(this)} />
            </div>
            <table id="matching-list5" >
            </table>
            <div id="matching-gridPager5"></div>
        </div>
    }
}
class CompanySerach extends Component {
    handleCancel() {
        this.props.matchingAction.closeFirstMtachingModal();
    }
    handleModal() {
        this.props.matchingAction.toggleMatching1Model(0);
    }
    handleModalCancel() {
        this.props.matchingAction.closeMatchingModal();
    }
    render() {
        var state = this.props.matchingTodos;
        return <div>
            <Modal  visible={state.cSerach} width="1200px" footer={false}
                    onCancel={this.handleCancel.bind(this)}>
                <TableList5 {...this.props} />
            </Modal>
            <Modal title="单位详情" visible={state.visible} width="1200px"
                   onOk={this.handleModal.bind(this)} onCancel={this.handleModalCancel.bind(this)} okText="保存" cancelText="取消">
                <ModalList1 {...this.props} />
            </Modal>
        </div>
    }
}
export  default CompanySerach;