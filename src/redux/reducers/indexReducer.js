import * as Types from 'CONSTANTS'
const initialState = {
    statics: {},
    indexCart: {},
    indexFeedback: {},
    indexSysnotice: {}
}

const indexReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.INDEX_INIT:
            state.statics = action.statics
            return Object.assign({}, state)
        case Types.INDEX_CART:
            state.indexCart = action.indexCart
            return Object.assign({}, state)
        case Types.INDEX_FEEDBACK:
            state.indexFeedback = action.indexFeedback
            return Object.assign({}, state)
        case Types.INDEX_NOTICE:
            state.indexSysnotice = action.indexSysnotice
            return Object.assign({}, state)
        default:
            return state
    }
}
export default indexReducer;