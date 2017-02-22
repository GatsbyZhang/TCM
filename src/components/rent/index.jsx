import React, {Component, PropTypes} from 'react';
import Company from '../sendGoods/company.jsx';
import Main from './main.jsx';
import './index.scss';
import  CompactDetailModelList from '../sendGoods/compactDetailModelList.jsx';
import RegisterModalList from '../register/userDetail.jsx';
class Rent extends Component {
    render(){
        return (
            <div id="rent">
                <Company {...this.props} />
                <CompactDetailModelList {...this.props} />
                <RegisterModalList {...this.props} />
                <Main {...this.props}/>
            </div>
        )
    }
}
export default Rent;