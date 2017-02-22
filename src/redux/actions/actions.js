/**
 * action
 */
import * as Types from '../constants/index'

export const clickListMenu = (name, e) =>
    ({
        type: Types.GET_MENU_INDEX,
        name: name,
    });


export const toggleCarBreakdown = (state) =>
    ({
        type: Types.CAR_BREAKDOWN_STATE
    });
export const toggleCarFree = (state) =>
    ({
        type: Types.CAR_FREE_STATE
    });

export const toggleCarWork = (state) =>
    ({
        type: Types.CAR_WORK_STATE
    });

export const loadCarsItems = (carsItems) =>
    ({
        type: Types.LOAD_CARS_ITEMS,
        carsItems
    });
export const getCarsItems = (carsDetail, detailId) =>
    ({
        type: Types.GET_CARS_ITEMS,
        carsDetail,
        detailId
    });

export const fetchCarDetail = (id)=>dispatch => {
    return fetch(`/static/Carsdata.json`)
        .then(response => response.json())
        .then(json => {
            dispatch(getCarsItems(json.carsDetail[0], id));
        })
};

export const getBrkdwnDetail = (brkDetail, brkDetailId) =>
    ({
        type: Types.GET_BRKDWN_DETAIL,
        brkDetail,
        brkDetailId
    });
export const toggleDay = () =>
    ({
        type: Types.TOGGLE_DAY,

    });
export const toggleWeek = () =>
    ({
        type: Types.TOGGLE_WEEK,

    });
export const toggleSeason = () =>
    ({
        type: Types.TOGGLE_SEASON,

    });
export const toggleYear = () =>
    ({
        type: Types.TOGGLE_YEAR,

    });



export const closeRegisterModallist = ()=>(
{
    type: Types.CLOSE_REGISTER_USERDEATIL,
}
);

export const CompactDetailModelList=(id)=>({
    type:Types.SHOW_COMPACTDETAIL,
    id
});

export const TaskDetailModelList=(id)=>({
    type:Types.SHOW_TASKDETAIL,
    id
});
export const closeTaskDetailModelList=()=>({
    type:Types.CLOSE_TASKDETAIL,
});
export const transportDetailModelList=(id)=>({
    type:Types.SHOW_TRANSPORTDETAIL,
    id
});
export const closeTransportDetailModelList=()=>({
    type:Types.CLOSE_TRANSPORTDETAIL,
});
export const isCompanyInputBlock=()=>({
    type:Types.ISCOMPANYINPUT_BLOCK,
});


export const fetchCarItems = ()=>dispatch => {
    return fetch(`/static/Carsdata.json`)
        .then(response => response.json())
        .then(json => {
            dispatch(loadCarsItems(json.carsItem));
        })
};

export const fetchBrkdwnDetail = (id) => dispatch => {
    return fetch(`/static/Carsdata.json`)
        .then(response => response.json())
        .then(json => {
            dispatch(getBrkdwnDetail(json.breakdown[id], id));
        })
};

//=======inner User =======


// 合同============
export const toggleCompactModel = (cptMdlVisible)=>
    ({
        type: Types.TOGGLE_COMPACT_MODEL,
        cptMdlVisible
    });
export const toggleleaseCompactModel = (leaseMdlVisible)=>
    ({
        type: Types.TOGGLE_LEASECOMPACT_MODEL,
        leaseMdlVisible
    });



//==高级搜索

export const hightlightCmp=(reg,rowId)=>
    ({
        type: Types.HIGHTLIGHT_REG,
        reg,
        rowId,
    });
export const setTab=(tab)=>
    ({
        type: Types.SET_TAB,
        tab
    });
