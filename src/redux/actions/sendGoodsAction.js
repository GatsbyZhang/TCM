/**
 * 首页action
 */
import * as Types from 'CONSTANTS/index'
import severRoot from 'CONSTANTS'//服务器根目录


export const closeCompactDetailModelList=()=>({
    type:Types.CLOSE_COMPACTDETAIL,
});

export const toggleSendGoodsModel = (id)=>({
    type: Types.TOGGLE_SENDGOODSMODAL,
    id,
});


export const toggleSendSelfcar = (sendSelfVisible,detailId)=>({
    type: Types.TOGGLE_SEND_SELFCAR,
    sendSelfVisible,
    detailId
});
export const toggleSendConfig = (sendConfigVisible)=>({
    type: Types.TOGGLE_SEND_CONFIG,
    sendConfigVisible
});
export const closeSendGoodsModal = ()=>({
    type: Types.CLOSE_SENDGOODSMODAL,
});


export const getRightKeyId = (id)=>({
    type: Types.GET_RIGHTKEYID,
    id
});


export const toggleAddSendModel=(sendMdlVisible)=>
    ({
        type: Types.TOGGLE_ADD_SEND,
        sendMdlVisible
    });

export const toggleMapModel=(mapMdlVisible)=>
    ({
        type: Types.TOGGLE_MAP,
        mapMdlVisible
    });
export const toggleSelect=(sid)=>
    ({
        type: Types.SELECT_SEND,
        sid
    });

export const getCompanylistDatas = () => dispatch => {//首页统计数据初始化
    fetch(severRoot + `/SUnitManage/list?userid=1`)
        .then(res => res.json()).then((json) => {
        dispatch({
            type: Types.GET_COMPANYLISTDATAS,
            companyListDatas: json.resultData.units,
            sid:json.resultData.units[0].UnitId
        })
    })
};