/**
 * Created by SWSD on 2016-12-20.
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from 'ACTION/actions'
import 'ASSET/scss/header'
import AdvancedSearch from 'COMPONENT/AdvancedSearch'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    changeState(state) {
        this.setState(state)
    }

    componentDidMount() {
        //获取搜索数据
        const {actions}=this.props;
        actions.fetchCarItems();
    }
    render() {
        return (
            <div id="search">
                <AdvancedSearch {...this.props} changeSearch={this.props.changeSearch}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        header: state.headerReducer,
        searchTodos: state.searchReducer,
        sendGoodsTodos: state.sendGoodsReducer,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
module.exports = connect(//从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
    mapStateToProps,//建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps//定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象
)(Search);