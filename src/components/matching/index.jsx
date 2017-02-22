import React, {Component, PropTypes} from 'react';
import './index.scss';
import Merger from './merge.js';
import RentMatching from './rentMatching.jsx';
import UserLink from './userLink.jsx';
import Operation from './operation.jsx';
import CompanySerach from './companySerach.jsx';
import {Tabs, Button, Icon,Modal,message} from 'antd';
import $ from 'jquery';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
class Matching extends Component {
    componentDidMount() {
        const that = this;
        $("#matching-list1").jqGrid({
            url: `http://192.168.1.67:8889/ExceptionMatch/GetReceiveUnitException`,
            datatype: "json",
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['编号', '发货单位', '联系人','联系电话', '收货单位', '联系人','联系电话'],
            colModel: [
                {
                    name:'ContractExceptionId',index:'ContractExceptionId',width:'10%',align:'center',formatter:'string'
                },
                {
                    name: 'SentUnitName', index: 'SentUnitName', width: '15%', align: 'center', formatter: 'string',
                },
                {
                    name: 'SendContact', index: 'SendContact', width: '10%', align: "center", formatter: 'string',
                },{
                    name: 'SendContactPhone', index: 'SendContactPhone', width: '20%', align: 'center', formatter: 'string',
                },
                {
                    name: 'RecieveUnitName', index: 'RecieveUnitName', width: '15%', align: "center", formatter: 'string',
                },{
                    name: 'Reciever', index: 'Reciever', width: '10%', align: 'center', formatter: 'string',
                },
                {
                    name: 'RecievePhone', index: 'RecievePhone', width: '20%', align: "center", formatter: 'string',
                }
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
            sortname:'ContractExceptionId',
            sortorder:'asc',
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            rowNum: 10,//每页显示记录数
            rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            jsonReader: {
                root: (obj)=>obj.resultData,   // json中代表实际模型数据的入口
                // page: (obj)=>obj.resultData.CurrentPageIndex+1,   // json中代表当前页码的数据
                // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                // records: "obj.resultData.TotalRecordCount", // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
            },
            subGrid: true,  // (1)开启子表格支持
            subGridRowExpanded: function(subgrid_id, row_id) {  //(2)子表格容器的id和需要展开子表格的行id，将传入此事件函数
                var subgrid_table_id;
                subgrid_table_id = subgrid_id + "_t";   //(3)根据subgrid_id定义对应的子表格的table的id

                var subgrid_pager_id;
                subgrid_pager_id = subgrid_id + "_pgr"  //(4)根据subgrid_id定义对应的子表格的pager的id

                // (5)动态添加子报表的table和pager
                $("#" + subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+subgrid_pager_id+"'class='scroll'></div>");

                // (6)创建jqGrid对象
                $("#" + subgrid_table_id).jqGrid({
                    url: "http://192.168.1.67:8889/ExceptionMatch/GetReceiveUnitException",  //(7)子表格数据对应的url，注意传入的contact.id参数
                    datatype: "json",
                    // height: " auto",//高度，表格高度。可为数值、百分比或'auto'
                    width: 1000,//自动宽
                    colNames: ['单位编号', '单位名称', '联系人','联系电话', '操作'],
                    colModel: [
                        {
                            name: 'UnitId', index: 'UnitId', width: '10%', align: "center", sortable: false,
                        },
                        {
                            name: 'UnitName', index: 'UnitName', width: '25%', align: "center", sortable: false,
                        },
                        {
                            name: 'Contact', index: 'Contact', width: '25%', align: "center", sortable: false,
                        },
                        {
                            name: 'ContactPhone', index: 'ContactPhone', width: '25%', align: "center", sortable: false,
                        },
                        {
                            name: 'del', index: 'del', width: '15%', align: "center", sortable: false,
                            formatter: function (cellValue, options, rowObject) {
                                return "<Button type='primary' id='matchingBtn"+rowObject.UnitId+"'>匹配</Button>";
                            }
                        }
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
                    jsonReader: {
                        root: (obj)=>obj.resultData[row_id-1].MatchUnitMsg,   // json中代表实际模型数据的入口
                        // page: (obj)=>obj.resultData.CurrentPageIndex+1,   // json中代表当前页码的数据
                        // total:(obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                        // records: "obj.resultData.TotalRecordCount", // json中代表数据行总数的数据
                        repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                        // id: "UserId",
                    },
                    pager: subgrid_pager_id,
                    viewrecords: true,
                    height: "100%",
                    rowNum: 5,
                    gridComplete: function () {
                            let mya = $("#" + subgrid_table_id);
                            for(var i=0;i<mya.getDataIDs().length;i++){
                                let row =mya.jqGrid('getRowData', i+1);//返回原始json数据
                                $("#matchingBtn"+row.UnitId).click(function(){
                                    //todo:后台匹配操作，并返回匹配结果
                                   let sumRow= $("#matching-list1").jqGrid('getRowData', row_id);//返回原始json数据
                                    that.matchingOpration({UnitId:row.UnitId,ContractExceptionId:sumRow.ContractExceptionId})
                                })
                            }
                        mya.jqGrid('setGroupHeaders', {
                            useColSpanStyle: true,
                            groupHeaders: [
                                {startColumnName: 'UnitId', numberOfColumns:5, titleText:'匹配单位(已注册的收货单位)   <button id="serach" style="width:50px;height:30px;line-height30px;border-radius:3px;' +
                                'text-align:center;background: #1C94C4; color: white;border:none">搜索</button>' },]
                        });
                        $('#serach').click(function () {
                            that.props.matchingAction.showMatching1CompanyList(row_id)
                        });
                    },
            });
            },
        pager: $('#matching-gridPager1'),
        });
        $("#matching-list1").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: [
                {startColumnName: 'SentUnitName', numberOfColumns:3, titleText:'合同中发货单位' },
                {startColumnName: 'RecieveUnitName', numberOfColumns:3, titleText:'合同中收货单位' }]
        });
        require('COMMON/rightkeys')();//自定义右键功能
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
        return (
            <div id="matching">
                <div className="mHeader">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="menu-unfold" />收货单位异常匹配</span>} key="1">
                            <div className="matching-tab">
                                <table id="matching-list1">
                                </table>
                                <div id="matching-gridPager1"></div>
                                <CompanySerach {...this.props} />
                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="menu-fold" />租赁单位异常匹配</span>} key="2">
                            <div className="matching-tab">
                                <RentMatching {...this.props}/>
                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="link" />用户关联匹配</span>} key="3">
                            <div className="matching-tab">
                                <UserLink {...this.props}/> 
                            </div>
                            
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="4">
                           
                            <div className="matching-tab">
                                <Operation {...this.props}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }
}
export default Matching;