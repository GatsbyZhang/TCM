import React, {Component} from 'react';
import compactData from './compactData.js';
import SendConfigDetail from './sendConfigDetail.jsx'
import { Popconfirm, message,Modal } from 'antd';
class Tab10 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendConfigVisible: false,
        }
    }
    componentDidMount(){
        const _this=this;
        $("#sendGoods-list10").jqGrid({
            datatype: "local", //数据来源，本地数据
            data: compactData.rows,
            mtype: "GET",//提交方式
            height: " auto",//高度，表格高度。可为数值、百分比或'auto'
            autowidth: true,//自动宽
            colNames: ['序号', 'ERP记录表', '字段','代码','砼车对应表名','对应字段','代码','接入/推送'],
            colModel: [
                //{name:'id',index:'id', width:'10%', align:'center' },
                {name: 'id', index: 'id', width: '10%', align: 'center',sortable: false},
                {name: 'tableName', index: 'tableName', width: '20%', align: 'center',sortable: false},
                {name: 'takeGoods', index: 'takeGoods', width: '15%', align: 'center',sortable: false},
                {name: 'code', index: 'code', width: '10%', align: "center", sortable: false,},
                {name: 'matching', index: 'matching', width: '10%', align: "center",sortable: false},
                {name: 'takeGoods', index: 'takeGoods', width: '15%', align: "center",sortable: false},
                {name: 'code', index: 'code', width: '10%', align: "center", sortable: false,},
                {name: 'del', index: 'del', width: '10%', align: "center", sortable: false,},
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
                root: compactData.rows,
                repeatitems: false,
            },
            pager: $('#sendGoods-gridPager10'),
            loadError: function () {
              
            },
            loadComplete: function (data) {
                
            },
            ondblClickRow:function (id) {
                _this.showModel(id)
            }

        });
        require('COMMON/rightkeys')( this.showModel.bind(this))
    }
    handleCancel() {
        this.setState({
            sendConfigVisible:false
        })
    }
    showModel(id) {
        this.setState({
            sendConfigVisible:true
        })
    }
    render() {
        const {sendGoodsTodos }=this.props;
        return <div>
            <table id="sendGoods-list10">
            </table>
            <div id="sendGoods-gridPager10"></div>
            <Modal title="后台配置" visible={this.state.sendConfigVisible}
                   onOk={this.handleCancel.bind(this)} onCancel={this.handleCancel.bind(this)}
                   width="1180px"
                   footer={null}
            >
                <SendConfigDetail {...this.props}/>
            </Modal>
        </div>
    }
}
export default Tab10;