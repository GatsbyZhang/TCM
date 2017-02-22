/**
 * 头部reducer
 */
import * as Types from 'CONSTANTS'
import severRoot from 'CONSTANTS'
const initialState = {
    name: null,
    tab: null,
}
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
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
export default searchReducer;