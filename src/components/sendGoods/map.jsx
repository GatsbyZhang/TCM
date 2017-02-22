/*
 * 首页地图组件
 * */
import React, {Component, PropTypes} from 'react'
import {Input,Modal} from 'antd'
const Search = Input.Search;
const confirm = Modal.confirm;
export default class Map extends Component {

    componentDidMount() {
        // 百度地图API功能
        let map = new BMap.Map("map") ;  // 创建Map实例
        const _this=this;
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 5); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl())  //添加地图类型控件
        map.setCurrentCity("北京")         // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(false)    //开启鼠标滚轮缩放
        //点击地图，获取经纬度坐标
        map.addEventListener("click",function(e){
            // $("#addr").val = e.point.lat;
            $("#lng").val("经度坐标："+e.point.lng);
            $("#lat").val("纬度坐标："+e.point.lat);
            var pt=e.point;
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                var a=addComp.province + "-"+ addComp.city + "-" + addComp.district+
                    "-"+ addComp.street+ "-" + addComp.streetNumber;
                $("#addr").val(a);
                if(addComp.street!=''){
                    confirm({
                        title: '确认?',
                        content: a,
                        onOk() {
                            const {actions, sendGoodsTodos}=_this.props;
                            actions.toggleMapModel(false);;
                        },
                        onCancel() {
                            $("#lng").val('');
                            $("#lat").val('');
                            $("#addr").val('')
                        },
                    });
                }

            })
        })

    };

    render() {
        return (
            <div className="geo">
                <div className="geo-search">
                    <Search defaultValue="上海思伟软件"/>
                </div>
                <div id="map"></div>
            </div>
        );
    }
}