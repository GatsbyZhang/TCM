/**
 * Created by SWSD on 2017-01-04.
 */
import * as Types from '../constants/index'
//模拟数据===
const DAY = ['0', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const WEEK = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

const YEAR = ['一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'];
const SEASON = ['第一季度', '第二季度', '第三季度', '第四季度'];
const DAY_DATA = [
    [0, 21, 2, 63, 4, 5,
        6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23],
    [0, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23],
    [10, 15, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 12, 19, 20, 21, 12, 23]
];
const WEEK_DATA = [
    [13, 3, 2, 11, 12, 2, 14],
    [23, 23, 12, 11, 12, 2, 14],
    [13, 6, 4, 11, 12, 2, 14]
];

const YEAR_DATA = [
    [23, 23, 11, 22, 33, 13,
        23, 32, 2, 1, 22, 1],
    [2, 3, 1, 2, 23, 13,
        1, 2, 32, 3, 2, 2],
    [11, 1, 22, 23, 2, 3,
        13, 24, 12, 23, 4, 2]
];
const SEASON_DATA = [
    [12, 12, 23, 22],
    [33, 12, 23, 15],
    [22, 32, 5, 17]
];
const STAFF_DATA = [40,20,40
];
const STAFF_DATA2 = [45,26.8,28.2
];
//=====================
const initState = {
    toggleName: DAY,
    toggleData: DAY_DATA,
    staffData: STAFF_DATA,
};

export default function setStatic(state = initState, action) {
    switch (action.type) {
        case Types.TOGGLE_DAY:
        {
            return {
                ...state,
                toggleName: DAY,
                toggleData: DAY_DATA,
            };
        }
        case Types.TOGGLE_WEEK:
        {
            return {
                ...state,
                toggleName: WEEK,
                toggleData: WEEK_DATA,
                staffData:STAFF_DATA2,
            };
        }
        case Types.TOGGLE_SEASON:
        {
            return {
                ...state,
                toggleName: SEASON,
                toggleData: SEASON_DATA,
            };
        }
        case Types.TOGGLE_YEAR:
        {
            return {
                ...state,
                toggleName: YEAR,
                toggleData: YEAR_DATA,
            };
        }
        default:
            return state

    }
}