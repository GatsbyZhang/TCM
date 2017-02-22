/**
 * 首页action
 */
import * as Types from 'CONSTANTS/index'
import severRoot from 'CONSTANTS'//服务器根目录

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

export const searchCompany = (searchCmp) =>
    ({
        type: Types.SEARCH_COMPANY,
        searchCmp
    });

