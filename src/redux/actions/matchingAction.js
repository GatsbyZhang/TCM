/*注册用户action*/
import * as Types from 'CONSTANTS/index'
import severRoot from 'CONSTANTS'//服务器根目录
export const toggleMatching1Model = (rowId) =>
    ({
        type: Types.TOGGLE_MATCHING_MODEL,
        rowId
    });
export const closeMatchingModal = ()=>
    ({
        type: Types.CLOSE_MATCHING_MODEL,
    });

export const changeUserDetail = (index)=>({
    type: Types.CLICK_MATCHING_DETAIL,
    index
});
export const toggleMatching1UserModel = ()=>(
{
    type: Types.SHOW_MATCHING_USERMODEL,
}
);
export const toggleMatching1UserModel2 = (word)=>(
{
    type: Types.SHOW_MATCHING_USERMODEL2,
    word
}
);
export const showMatching1CompanyList = (row_id)=>(
{
    type: Types.SHOW_MATCHING_COMPANYLIST,
    ContractExceptionId:row_id
}
);
export const closeFirstMtachingModal = ()=>(
{
    type: Types.CLOSE_MATCHING_FIRSTCOMPANYLIST,
}
);