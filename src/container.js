/**
 * Created by SWSD on 2017-01-11.
 */
import React, {Component, PropTypes} from 'react'
import IndexMain from './indexMain'
import Login from './login'
import * as Actions from 'ACTION/headerAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
class Container extends Component {
    render() {

        let current = this.props.login.comeTrue
        if(sessionStorage.isLogin=="true"){
            current = <IndexMain/>
        }
        else{
            current = <Login loginIn={this.props.actions.LoginIn}/>
        }
        return (
            <div id="container">
                {current}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        login: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}
module.exports = connect(//从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来
    mapStateToProps,//建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
    mapDispatchToProps
)(Container)