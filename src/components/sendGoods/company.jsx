/**
 * Created by SWSD on 2017-01-06.
 */
import React, {Component, PropTypes} from 'react';
import AddSendCompany from './addSendCompany.jsx';
import SendGoodsModalList1 from './sendGoodsmodalList1.jsx';
import {Icon, Modal,message} from 'antd';
const confirm = Modal.confirm;
class Company extends Component {
    getDoubleClick(id) {
        this.props.sendGoodsAction.toggleSendGoodsModel(id);
    }

    rightMuteClick(id, e) {
        this.props.sendGoodsAction.toggleSendGoodsModel(id);
        $('#rightMute').css({display: 'none'});

    }
    delCompany(id){
        if(id==null){
            confirm({
                title: '提示',
                content: `请选择您要删除的公司！`,
                onOk(){},
                onCancel() {},
            });
            return;
        }
        confirm({
            title: '提示',
            content: `确认删除${id}公司？`,
            onOk() {
                //todo:提交删除公司数据给后台处理
                message.success('该公司已删除');
            },
            onCancel() {
            },
        });
        $('#rightMute').css({display: 'none'})
    }
    doNothing(id, e) {
        this.props.actions.getRightKeyId(id);
        var x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
        var y = e.clientY + document.body.scrollTop - document.body.clientTop;
        $('#rightMute').css({top: y, left: x, display: 'block'});
        window.event.returnValue = false;
        return false;
    }

    handleOk() {
        const {sendGoodsAction, sendGoodsTodos}=this.props;
        sendGoodsAction.toggleAddSendModel(false);
    }

    handleCancel() {
        const {sendGoodsAction, sendGoodsTodos}=this.props;
        sendGoodsAction.toggleAddSendModel(false);
    }

    showModel() {
        const {sendGoodsAction, sendGoodsTodos}=this.props;
        sendGoodsAction.toggleAddSendModel(!sendGoodsTodos.sendMdlVisible);
        $('#rightMute').css({display: 'none'})
    }

    selectIt(id){
        const {sendGoodsAction, sendGoodsTodos}=this.props;
        if(id==sendGoodsTodos.sid){
            sendGoodsAction.toggleSelect(sendGoodsTodos.companyListDatas[0].UnitId);
        }else{
            sendGoodsAction.toggleSelect(id);
        }
        $('#rightMute').css({display: 'none'})
    }
    handleDetailModal() {
        this.props.sendGoodsAction.toggleSendGoodsModel(0);
    }
    handleDetailCancel() {
        this.props.sendGoodsAction.closeSendGoodsModal();
    }
    componentDidMount(){
        //高级搜索结果显示高亮
        let regex;
        $('#sendGoods').highlightRegex();
        regex = new RegExp(this.props.reg, 'ig');
        if (typeof regex !== 'undefined') {
            $('#sendGoods').highlightRegex(regex);
        };
    }
    render() {
        document.onclick = function () {
            $('#rightMute').css({display: 'none'})
        };
        const {sendGoodsTodos}=this.props;
        var datas = sendGoodsTodos.companyListDatas;
        var id = sendGoodsTodos.id;
        return (
            <div className="company">
                <div id="rightMute">
                    <ul>
                        <li onClick={this.rightMuteClick.bind(this,id)}>查看</li>
                        <li onClick={this.showModel.bind(this)}>添加</li>
                        <li onClick={this.delCompany.bind(this,id)}>删除</li>
                    </ul>
                </div>
                <div className="companyHeader">
                    <span>选择</span>&nbsp;&nbsp;&nbsp;
                    <span>累计：{datas.length}</span>
                    <Icon type="edit" onClick={this.rightMuteClick.bind(this,id)}/>
                    <Icon type="minus-circle-o" onClick={this.delCompany.bind(this,sendGoodsTodos.sid)}/>
                    <Icon type="plus-circle-o" onClick={this.showModel.bind(this)}/>
                </div>
                {
                    datas.map(function (list) {
                        let UCreateTimeStamp=new Date(parseInt(list.UCreateTimeStamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');

                        return <div className="companyList" key={list.UnitId}
                                    onContextMenu={this.doNothing.bind(this,list.UnitId)}
                                    onDoubleClick={this.getDoubleClick.bind(this,list.UnitId)}
                                    onClick={this.selectIt.bind(this,list.UnitId)}
                                    style={{background:sendGoodsTodos.sid==list.UnitId?"#108EE9":"#41C7DB"}}
                        >
                            <p>{list.UnitStatus}</p>
                            <h4>{list.UnitName}</h4>
                            <p>{UCreateTimeStamp}</p>
                        </div>
                    }.bind(this))
                }
                <Modal title="添加发货单位" visible={sendGoodsTodos.sendMdlVisible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       width="1180px"
                >
                    <AddSendCompany {...this.props}/>
                </Modal>
                <Modal title="单位详情" visible={sendGoodsTodos.visible} width="1200px"
                       onOk={this.handleDetailModal.bind(this)} onCancel={this.handleDetailCancel.bind(this)} okText="保存" cancelText="取消">
                    <SendGoodsModalList1 {...this.props}/>
                </Modal>
            </div>
        )
    }
}
export default Company;