import {combineReducers} from 'redux'//把不同的reduder结合在一起
import carsReducer from './CarsReducers'
import staticReducer from './StaticReducers'
import userMngReducer from './UserMngReducers'
import headerReducer from './headerReducer'
import loginReducer from './loginReducer'
import matchingReducer from './matchingReducer'
import compactReducer from './CompactReducers'
import registerReducer from './registerReducer'
import sendGoodsReducer from './sendGoodsReducer'
import indexReducer from './indexReducer'
import searchReducer from './searchReducer'
import driverReducer from './driverReducer'

const reducer=(state={
    name:'Index'
},action)=>{
    switch(action.type){
        case 'GET_menuIndex':
            return state={name:action.name};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    reducer,
    carsReducer,
    staticReducer,
    userMngReducer,
    matchingReducer,
    headerReducer,
    compactReducer,
    registerReducer,
    sendGoodsReducer,
    searchReducer,
    login:loginReducer,
    index:indexReducer,
    driver:driverReducer,
});

export default rootReducer;
