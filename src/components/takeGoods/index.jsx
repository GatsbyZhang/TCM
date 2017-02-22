import React, {Component, PropTypes} from 'react';
import Company from '../sendGoods/company.jsx';
import './index.scss';
import Main from './main.jsx';
import  CompactDetailModelList from '../sendGoods/compactDetailModelList.jsx';
import RegisterModalList from '../register/userDetail.jsx';


class TakeGoods extends Component {
    render() {
        return <div id="takeGoods">
            <Company {...this.props}/>
            <CompactDetailModelList {...this.props} />
            <RegisterModalList {...this.props} />
            <Main {...this.props}/>
        </div>
    }
}
export default TakeGoods;