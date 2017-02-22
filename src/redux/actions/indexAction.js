/**
 * 首页action
 */
import * as Types from 'CONSTANTS/index'
import severRoot from 'CONSTANTS'//服务器根目录
export const indexInit = () => dispatch => {//首页统计数据初始化
    fetch(severRoot + "Statistics/GetSysStatistics")
        .then(res => res.json()).then((json) => {
        dispatch({
            type: Types.INDEX_INIT,
            statics: json.resultData
        })
    })
}

export const indexCart = (type) => dispatch => {//首页用户分析图表数据
    fetch(severRoot + `Statistics/GetUserAnalysis?statisticsType=${type}`)
        .then(res => res.json()).then((json) => {
        dispatch({
            type: Types.INDEX_CART,
            indexCart: json.resultData
        })
    })
};

export const indexFeedback = () => dispatch => {//首页反馈信息数据
    fetch(severRoot + `SysManage/GetBGComment`)
        .then(res => res.json())
        .then((json) => {
        dispatch({
            type: Types.INDEX_FEEDBACK,
            indexFeedback: json.resultData
        })
    })
}

export const indexSysnotice = () => dispatch => {//首页系统公告列表
    fetch(severRoot + `SysManage/GetSysNotice`)
        .then(res => res.json()).then((json) => {
        dispatch({
            type: Types.INDEX_NOTICE,
            indexSysnotice: json.resultData
        })
    })
}