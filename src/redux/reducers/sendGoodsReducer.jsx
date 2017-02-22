import * as Types from '../constants/index';
import datas from '../../components/matching/data.js';
import userDatas from '../../components/matching/userData.js';
import compactData from '../../components/sendGoods/compactData.js';
const initState = {
    sendMdlVisible: false,
    mapMdlVisible: false,
    datas: datas,
    visible: false,
    item: '',
    userDatas: userDatas,
    compactData: compactData,
    compactVisible: false,
    compactId: '',
    taskVisible: false,
    taskId: '',
    transportVisible: false,
    transportId: '',
    sid: '',
    isBlock:false,
    id:null,
    companyListDatas:[],
    operateDatas:[],
};
const sendGoodsReducer = (state = initState, action)=> {
    switch (action.type) {
        case'TOGGLE_SENDGOODSMODAL':
            return {
                ...state,
                visible: true,
                item: action.id
            };
        case 'CLOSE_SENDGOODSMODAL':
            return {...state, visible: false};
        case 'GET_RIGHTKEYID':
            return {...state, id: action.id};
        case Types.TOGGLE_ADD_SEND:
            return {
                ...state,
                sendMdlVisible: action.sendMdlVisible
            };
        case Types.TOGGLE_SEND_SELFCAR:
            return {
                ...state,
                sendSelfVisible: action.sendSelfVisible,
                detailId: action.detailId,
            };
        case Types.TOGGLE_MAP:
            return {
                ...state,
                mapMdlVisible: action.mapMdlVisible
            };
        case Types.SELECT_SEND:
            return {
                ...state,
                sid: action.sid
            };
        case Types.TOGGLE_SEND_CONFIG:
            return {
                ...state,
                sendConfigVisible: action.sendConfigVisible
            };
        case 'SHOW_COMPACTDETAIL':
            return {...state, compactId: action.id, compactVisible: true};
        case 'CLOSE_COMPACTDETAIL':
            return {...state, compactVisible: false};
        case 'SHOW_TASKDETAIL':
            return {...state, taskVisible: true, taskId: action.id};
        case 'CLOSE_TASKDETAIL':
            return {...state, taskVisible: false};
        case 'SHOW_TRANSPORTDETAIL':
            return {...state, transportVisible: true, transportId: action.id};
        case 'CLOSE_TRANSPORTDETAIL':
            return {...state, transportVisible: false};
        case 'ISCOMPANYINPUT_BLOCK':
            return {...state,isBlock:!state.isBlock};
        case 'GET_COMPANYLISTDATAS':
           
            return {...state,companyListDatas:action.companyListDatas,
            sid:action.sid
            }
      
    }
    return state;
};
function todo(state, action) {
    for (var i = 0; i < action.index.length; i++) {
        if (state.id == action.index[i]) {
            var tt = state = {...state, del: true};
        }
        else {
            tt = state;
        }
    }
    return state = tt;
}

export default sendGoodsReducer;