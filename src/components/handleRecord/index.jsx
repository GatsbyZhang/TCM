/**
 * Created by SWSD on 2017-01-04.
 */
import React from 'react';
import SearchForm from './searchForm.jsx'
import Operation from './operation.jsx'
import './handle.scss'

export default class HandleRecord extends React.Component {
    render() {
        return  <div id="handleRecord">
            <SearchForm {...this.props}/>
            <div id="hr"></div>
            <Operation {...this.props}/>
        </div>
    }
}