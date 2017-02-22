import React, {Component} from 'react';
import severRoot from '../../redux/constants/index'
import RegisterModalList from './../register/userDetail.jsx';

class Tab1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Ustate:''
        }
    }
    handleCancel() {
        this.setState({
            visible:false,
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
    componentDidMount(){
        let userDatas=this.props.sendGoodsTodos.userDatas;
        let that=this;
        let {sendGoodsAction,sendGoodsTodos}=this.props;
        sendGoodsAction.getCompanylistDatas();
        sendGoodsAction.toggleSelect(sendGoodsTodos.sid);
        let unitId;
        setTimeout(function () {
             unitId=that.props.sendGoodsTodos.sid;
            $("#sendGoods-list1").jqGrid({
                url: severRoot+`SUnitManage/UserList?unitId=${unitId}&userid=${sessionStorage.UserId}`,
                datatype: "json", //数据来源，本地数据
                mtype: "GET",//提交方式
                height:" auto",//高度，表格高度。可为数值、百分比或'auto'
                autowidth: true,//自动宽
                colNames: ['编号', '姓名', '联系电话','注册时间','在线时长','用户角色','备注'],
                colModel: [
                    //{name:'id',index:'id', width:'10%', align:'center' },
                    {name: 'UserId', index: 'UserId', width: '5%', align: 'center',sortable: false},
                    {name: 'UName', index: 'UName', width: '10%', align: 'center',sortable: false},
                    {name: 'UPhone', index: 'UPhone', width: '20%', align: 'center',sortable: false},
                    {name: 'RegisterTimeStamp', index: 'RegisterTimeStamp', width: '20%', align: 'center',sortable: false},
                    {name: 'OnlineTime', index: 'OnlineTime', width: '10%', align: "center",sortable: false},
                    {name: 'URoleCode', index: 'URoleCode', width: '15%', align: "center",sortable: false},
                    {name: 'Remark', index: 'Remark', width: '20%', align: "center", sortable: false,}
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
                viewrecords: true,//是否在浏览导航栏显示记录总数
                emptyrecords: '暂无数据',//数据为0时的显示信息，只有在viewrecords设置为true时有效果
                // multiselect: true, //多选框
                rowNum: 10,//每页显示记录数
                rowList: [5, 10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
                localReader: {
                    root: userDatas,
                    //id: "blackId",//设置返回参数中，表格ID的名字为blackId
                    repeatitems: false,
                },
                pager: $('#sendGoods-gridPager1'),
                ondblClickRow:function(id, iRow, iCol, e){
                    let row = $("#sendGoods-list1").jqGrid('getLocalRow', id);//返回原始json数据
                    if(iCol!=7){
                        that.showModel(id,{type:"show"});
                    }
                },
            });
            console.log("S-tab>>>>>>",that.props)
            function copy() {
                //todo:刷新数据
                $("#register-list1").trigger("reloadGrid")
            }
            require('COMMON/rightkeys')(that.showModel.bind(that),copy.bind(that));//自定义右键功能

        },100);

    }
    render() {
        return <div>
            <table id="sendGoods-list1">
            </table>
            <div id="sendGoods-gridPager1"></div>
            <RegisterModalList {...this.props}
                type={this.state.type}
                visible={this.state.visible}
                handleOk={this.handleOk.bind(this)}
                handleCancel={this.handleCancel.bind(this)}
                showModel={this.showModel.bind(this)}/>
        </div>
    }
}
export default Tab1;