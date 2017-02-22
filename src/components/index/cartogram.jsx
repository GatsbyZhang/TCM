/*
 * 系统用户和绩效统计组件
 * */
import React, {Component, PropTypes} from 'react'
import {Icon} from 'antd'
export default class Cartogram extends Component {
    componentDidMount() {
        this.props.indexInit()
    }

    render() {
        const {init} = this.props?this.props:{init:{}}
        return (
            <div className="cartogram clearfix">
                <div className="online-user">
                    <div className="detail">
                        <p>{init.OnlineUser}</p>
                        <p>在线用户</p>
                    </div>
                    <Icon type="tags-o"/>
                </div>
                <div className="newadd-user">
                    <div className="detail">
                        <p>{init.NewUser}</p>
                        <p>新增用户</p>
                    </div>
                    <Icon type="user"/>
                </div>
                <div className="total-user">
                    <div className="detail">
                        <p>{init.TotalUser}</p>
                        <p>总用户</p>
                    </div>
                    <Icon type="user"/>
                </div>
                <div className="transport">
                    <div className="detail">
                        <p>{init.TransportNum}</p>
                        <p>运输方次</p>
                    </div>
                    <Icon type="shopping-cart"/>
                </div>
                <div className="sign-trips">
                    <div className="detail">
                        <p>{init.SignTrips}</p>
                        <p>签收车次</p>
                    </div>
                    <Icon type="solution"/>
                </div>
            </div>
        );
    }
}