import * as Types from '../constants/index';
import matchingDatas from '../../components/matching/data.js';
import userDatas from '../../components/matching/userData.js';
const matchingReducer = (state = {
    matchingDatas: {}, 
    visible: false, 
    item: '',
    userDatas:userDatas,
    userVisible:false,
    cSerach:false,
    userVisible2:false,
    word:'',
    ContractExceptionId:null
}, action)=> {
    switch (action.type) {
        case 'GET_MATCHINGDATA':
             state.matchingDatas=action.matchingDatas;
            return state;
        case 'TOGGLE_MATCHING_MODEL':
            return {...state, visible: !state.visible, item: action.rowId};
        case 'CLOSE_MATCHING_MODEL':
            return {...state, visible:false,userVisible:false,userVisible2:false,};
        case 'CLICK_MATCHING_DETAIL':
            return getTodo(action,state);
        case 'SHOW_MATCHING_USERMODEL':
            return {...state,userVisible:true};
        case 'SHOW_MATCHING_USERMODEL2':
            return {...state,userVisible2:true,word:action.word};
        case 'SHOW_MATCHING_COMPANYLIST':
            return {...state,cSerach:true,ContractExceptionId:action.ContractExceptionId};
        case 'CLOSE_MATCHING_FIRSTCOMPANYLIST':
            return {...state,cSerach:false};
    }
    return state;
};
function todo(state,action){
    for(var i=0;i<action.index.length;i++){
        if(state.id==action.index[i]){
            var tt = state= {...state, del:true};
        }
        else{
            tt=state;
        }
    }
    return state = tt;
}
function getTodo(action,state){
    var userDatas=state.userDatas.map(t=>todo(t,action));
    return {...state,userDatas}
}
export default matchingReducer;