/**
 * Created by SWSD on 2017-01-04.
 */
import * as Types from '../constants/index'

const initState={
    cptMdlVisible:false,
    leaseMdlVisible:false,
};
function configMenu(state=initState, action) {
    
}
export default function compact(state=initState, action) {

    switch(action.type){
       
        case Types.TOGGLE_COMPACT_MODEL:
        {
            return{
                ...state,
                cptMdlVisible:action.cptMdlVisible
            }
        }
        case Types.TOGGLE_LEASECOMPACT_MODEL:
        {
            return{
                ...state,
                leaseMdlVisible:action.leaseMdlVisible
            }
        }
        
        default:
            return{
                ...state
            }

    }
}