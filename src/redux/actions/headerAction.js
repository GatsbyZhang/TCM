/**
 * 创建Action
 */
import * as Types from 'CONSTANTS/index'

export const LoginOut = () =>//注销登录
    ({
        type: Types.LOGIN_OUT,
        userID: null
    });

export const LoginIn = (user) =>//登录
    ({
        type: Types.LOGIN_IN,
        user: user
    });
export const getPreViewPic = (preImgUrl)=>({
    type: Types.GET_PREVIEW_PIC,
    preImgUrl,
});
export const clearPreImgUrl = ()=>({
    type: Types.CLEAR_PREIMGURL,
});

