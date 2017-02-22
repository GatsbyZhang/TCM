/**
 * 头部reducer
 */
import * as Types from 'CONSTANTS'
const initialState = {
    visible: false,
    name: null,
    tab: null,
    preImgUrl: false,
}
const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PREVIEW_PIC':
            return {...state, preImgUrl: action.preImgUrl};
        case 'CLEAR_PREIMGURL':
            return {...state, preImgUrl: false};
        case Types.GET_MENU_INDEX:
            return {
                ...state,
                name: action.name
            }
        case Types.HIGHTLIGHT_REG:
            return {
                ...state,
                reg: action.reg,
                rowId: action.rowId,
            }
        case Types.SET_TAB:
            return {
                ...state,
                tab: action.tab
            }
        case Types.LOAD_CARS_ITEMS:
            return {
                ...state,
                carsItems: action.carsItems
            }
        default:
            return state
    }
}
export default headerReducer;