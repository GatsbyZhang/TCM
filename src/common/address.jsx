/*
 * 地址组件
 * */
import React, {Component, PropTypes} from 'react'
import {Icon} from 'antd';
export default class Detail extends Component {
    componentDidMount() {
        const {oDiv,itudeId,positionId,itude} = this.props
        new ShowMap(oDiv, {
            city: '上海',
            addr: '政立路',
            mapx: itude?itude:'121.5114,31.314558',//默认的经纬度
            ismove: '1',
            piobj: itudeId,//经纬度显示的表单id
            posm:positionId//地址显示的表单id
        })
    }
    loaclPosition(){
        const {oDiv,itudeId,positionId} = this.props
        new ShowMap(oDiv, {
            ismove: '1',
            piobj: itudeId,//经纬度显示的表单id
            posm:positionId//地址显示的表单id
        })
    }
    render() {
        const {oDiv,itudeId,positionId} = this.props
        return (
            <div id="address">
                <label>地址：</label><input id={positionId} name={positionId} type="text"/>
                <div className="jingweidu">
                    <label>经纬度：</label>
                    <input id={itudeId} disabled="disabled" name={itudeId} type="text"/>
                </div>
                <label className="addresss-icon">
                    <Icon type="environment-o" onClick={this.loaclPosition.bind(this)}/>
                </label>
                <div id={oDiv} className="address-map"></div>
            </div>
        )
    }
}