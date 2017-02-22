/**
 * Created by SWSD on 2017-01-04.
 */
import * as Types from '../constants/index'

const initState={
    loadingCarsItem: true,
    carsItems:[],
    carsDetail:[],
    brkDetail:[],
}
function carsState(state, action) {
    switch(action.type){

        case Types.LOAD_CARS_ITEMS:
        {
            return{
                ...state,
                carsItems:action.carsItems
            }
        }
        case Types.CAR_BREAKDOWN:
        {
            return{
                ...state,
                carsState:action.state
            }
        }
        case Types.CAR_FREE:
        {
            return{
                ...state,
                carsState:action.state
            }
        }
        case Types.CAR_WORK:
        {
            return{
                ...state,
                carsState:action.state
            }
        }
        default:
            return{
                ...state
            }
    }
}
export default function carsManages(state=initState, action) {

    switch(action.type){
        case Types.LOAD_CARS_ITEMS:
        {
            return{
                ...state,
                loadingCarsItem:true
            }
        }
        case Types.GET_CARS_ITEMS:
        {
            return{
                ...state,
                loadingCarsItem:false,
                carsDetail:action.carsDetail,
                detailId:action.detailId,
            }
        }
       
        case Types.GET_BRKDWN_DETAIL:
        {
            return{
                ...state,
                brkDetail:action.brkDetail,
                brkDetailId:action.brkDetailId,
            }
        }
        case Types.SEARCH_COMPANY:
        {
            return{
                ...state,
                searchCmp:action.searchCmp
            }
        }
        case Types.CAR_BREAKDOWN_STATE:
        case Types.CAR_FREE_STATE:
        case Types.CAR_WORK_STATE:
        {
            carsState(state=initState, action);
        }
        default:
            return{
                ...state
            }

    }
}