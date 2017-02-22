import React, {Component, PropTypes} from 'react';
import Company from './company.jsx';
import Main from './main.jsx';
import  CompactDetailModelList from './compactDetailModelList.jsx';
import RegisterModalList from '../register/userDetail.jsx';
import './index.scss';
class SendGoods extends Component {
    render() {
        return (
            <div id="sendGoods">
                <Company {...this.props} />
                <CompactDetailModelList {...this.props} />
                <RegisterModalList {...this.props} />
                <Main {...this.props}/>
            </div>
        )
    }
}
export default SendGoods;