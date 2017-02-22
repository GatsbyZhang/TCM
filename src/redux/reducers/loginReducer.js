/**
 * 登录相关reducer
 */
import * as Types from '../constants/index'
const initialState = {
    comeTrue: "Login",
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_OUT:
            state.comeTrue = "Login";
            sessionStorage.isLogin = false
            return Object.assign({}, state)
        case Types.LOGIN_IN:
            state.comeTrue = "IndexMain"
            sessionStorage.isLogin = true
            //保存用户信息
            sessionStorage.OnlineTime = action.user.OnlineTime
            let localDate = new Date(parseInt(action.user.RegisterTime.replace(/[^0-9]+/g, '')))
            sessionStorage.RegisterTime = localDate.toLocaleDateString()+" "+localDate.toLocaleTimeString()
            sessionStorage.UHeadImg = action.user.UHeadImg
            sessionStorage.UPhone = action.user.UPhone
            sessionStorage.UserId = action.user.UserId
            sessionStorage.UName = action.user.UName
            return Object.assign({}, state)
        default:
            return state
    }
};
export default loginReducer;