import React, {Component, PropTypes} from 'react';
import {Tabs, Icon, Modal, message} from 'antd';
const confirm = Modal.confirm;
import './index.scss';
import Tab2 from './Tab2.jsx';
import Tab3 from './Tab3.jsx';
import severRoot from '../../redux/constants/index'
import RegisterModalList from './userDetail.jsx';
const TabPane = Tabs.TabPane;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Ustate: ''
        }
    }

    componentDidMount() {

        //tab1
        let that = this;
        $("#register-list1").jqGrid({
            url: severRoot + `UserManager/UserList?type=all&userid=${sessionStorage.UserId}`,
            datatype: "json",
            // data: userDatas,
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['编号', '姓名', '联系电话', '单位名称', '注册时间', '在线时长', '用户角色', '状态'],
            colModel: [
                {name: 'UserId', index: 'UserId', width: '5%', align: 'center'},
                {name: 'UName', index: 'UName', width: '5%', align: 'center', sortable: false},
                {name: 'UPhone', index: 'UPhone', width: '15%', align: "center"},
                {name: 'UnitName', index: 'UnitName', width: '15%', align: "center", sortable: false},
                {
                    name: 'RegisterTimeStamp',
                    index: 'RegisterTimeStamp',
                    width: '20%',
                    align: "center",
                    sortable: false,
                    formatter: function (cellvalue, options, rowObject) {

                        return new Date(parseInt(cellvalue) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
                    }
                },
                {
                    name: 'OnlineTime', index: 'OnlineTime', width: '15%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return rowObject.OnlineTime + '小时'
                    }
                },
                {name: 'URoleCode', index: 'URoleCode', width: '15%', align: "center", sortable: false},
                {
                    name: 'UStatus', index: 'UStatus', width: '10%', align: "center", sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return `<select id="toggleState${rowObject.UserId}">
                            <option value='正常'>正常</option>
                            <option value='注销' {${cellvalue}==0?{"selected"}:{""}}>注销</option>
                            </select>`
                    }
                }
            ],
            prmNames: {
                page: "pageIndex",    // 表示请求页码的参数名称
                rows: "pageSize",    // 表示请求行数的参数名称
                sort: "orderBy", // 表示用于排序的列名的参数名称
                order: "order", // 表示采用的排序方式的参数名称
                search: null, // 表示是否是搜索请求的参数名称
                nd: null, // 表示已经发送请求的次数的参数名称
                id: "UserId", // 表示当在编辑数据模块中发送数据时，使用的id的名称
                deloper: "del", // 当在delete模式中提交数据时，操作的名称
                subgridid: null, // 当点击以载入数据到子表时，传递的数据名称
                npage: null,
                totalrows: null // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
            },
            sortname: 'UserId',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
            rownumbers: false,//添加左侧行号
            viewrecords: true,//是否在浏览导航栏显示记录总数
            emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
            // multiselect: true, //多选框
            page: 0,//设置了初始页码，为什么翻页还是从1开始计算？搞得快吐了~~~
            rowNum: 3,//每页显示记录数
            jsonReader: {
                root: (obj)=>obj.resultData.Users,   // json中代表实际模型数据的入口
                page: (obj)=>obj.resultData.CurrentPageIndex,   // json中代表当前页码的数据
                total: (obj)=>obj.resultData.TotalPageCount, // json中代表页码总数的数据
                records: (obj)=>obj.resultData.TotalRecordCount, // json中代表数据行总数的数据
                repeatitems: false, // 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素
                id: "UserId",
            },
            pager: $('#register-gridPager1'),
            ondblClickRow: function (id, iRow, iCol, e) {
                if (iCol != 7) {
                    that.showModel(id,{type:"show"});
                }
            },
            loadComplete: function (xhr) {
                let idArr = $("#register-list1").jqGrid('getDataIDs');
                for (var i = 0; i < idArr.length; i++) {
                    $("#toggleState" + idArr[i]).bind('change', function () {
                        let value = $("#toggleState" + idArr[i]).value == '正常' ? '正常' : '注销';
                        that.toggleState(value, "#toggleState" + idArr[i])
                    });
                }
            }

        });
        function copy() {
            //todo:刷新数据
            // $("#register-list1").jqGrid("addRowData", 99, that.dataRow, "first");
            $("#register-list1").trigger("reloadGrid")
        }

        require('COMMON/rightkeys')(that.showModel.bind(that), copy.bind(that));//自定义右键功能
    }

    toggleState(value, id) {
        //todo：与后台交互，切换用户状态
        this.setState({
            Ustate: value
        });
        let _this = this;
        confirm({
            title: `提示`,
            content: `确定将该用户修改为${_this.state.Ustate}状态吗?`,
            onOk() {
                message.success(`操作成功`);
            },
            onCancel() {
                let v = _this.state.Ustate == '正常' ? '注销' : '正常';
                $(id).val(v)
            },
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    handleOk() {
        let dataRow = $("#frm-reg-detail").serialize();
        console.log("reg-handleok>>>>>", dataRow);
        let {type}=this.state;
        if (type == 'show') {
            //todo:修改用户数据
            //    $.post(url,data,function(){
            // })
        } else if (type == 'add') {
            //todo:克隆用户数据
            //    $.post(url,data,function(){
            // })
        }
        this.setState({
            visible: false,
        });
    }

    showModel(id, json) {
        const {registerAction}=this.props;
        registerAction.regDetail(id);
        this.setState({
            visible: true,
            type: json.type
        });
    }

    render() {
        return (
            <div id="register">
                <div className="rHeader">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="appstore-o" />全部</span>} key="1">
                            <div className="register-tab">
                                <table id="register-list1">
                                </table>
                                <div id="register-gridPager1"></div>

                                <RegisterModalList {...this.props} type={this.state.type}
                                                                   visible={this.state.visible}
                                                                   handleOk={this.handleOk.bind(this)}
                                                                   handleCancel={this.handleCancel.bind(this)}
                                                                   showModel={this.showModel.bind(this)}/>

                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="user" />未绑定的单位用户</span>} key="2">
                            <div className="register-tab">
                                <Tab2 {...this.props} handleCancel={this.handleCancel.bind(this)}
                                                      showModel={this.showModel.bind(this)}/>
                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="pushpin-o" />操作记录</span>} key="3">

                            <div className="register-tab">
                                <Tab3 {...this.props}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default Register;