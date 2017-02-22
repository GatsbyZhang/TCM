import userDatas from '../../components/matching/userData.js';
const registerReducer=(state={
    visible:false,
},action)=>{
    switch(action.type){
        case 'SHOW_REGISTER_USERDEATIL':
            return {...state,
                userDatas:action.userDatas};
    }
    return state;
};
export default registerReducer;