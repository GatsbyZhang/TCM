/**
 * 首页action
 */
import * as Types from 'CONSTANTS/index'
import severRoot from 'CONSTANTS'//服务器根目录

export const toggleRegisterModelList = (userDatas)=>({
    type: Types.SHOW_REGISTER_USERDEATIL,
    userDatas
});
export const regDetail = (uid) => dispatch => {
    fetch(severRoot+`UserManager/UserDetails?searchUserId=${uid}&userid=${sessionStorage.UserId}`)
        .then(response => response.json())
        .then(json => {
            dispatch(toggleRegisterModelList(json.resultData))
        });
}
