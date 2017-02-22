/*
 * 首页地图组件
 * */
import React, {Component, PropTypes} from 'react'
import {Input, Select} from 'antd'
const Search = Input.Search
const Option = Select.Option
const OptGroup = Select.OptGroup
import cityName from './chinaCity.json'
export default class Geo extends Component {
    state = {
        marker: [
            {//数据
                id: 1,
                point: "121.5114, 31.314558",
                title: "加油站",
                linkMan: "李先生",
                telephone: "13223456789",
                address: "上海市江湾体育场"
            }, {
                id: 2,
                point: "121.5614, 31.314558",
                title: "加油站",
                linkMan: "李先生",
                telephone: "13223456789",
                address: "上海市江湾体育场"
            },
        ]
    }

    bdMapCity(city = "上海市", zoom) {
        geoMap.setCenter(city)
        geoMap.setZoom(zoom)
    }

    bdMapInit() {
        // 百度地图API功能
        let map = new BMap.Map("index-map")   // 创建Map实例
        map.enableScrollWheelZoom()//鼠标滚轮缩放
        var point = new BMap.Point(121.5114, 31.314558)
        map.centerAndZoom(point, 6); // 初始化地图,设置中心点坐标和地图级别

        //向地图中添加缩略图控件
        var ctrlOve = new window.BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: 1
        })
        map.addControl(ctrlOve)

        //向地图中添加比例尺控件
        var ctrlSca = new window.BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrlSca)
        window.geoMap = map
    }

    bdMapMarker(map = geoMap) {
        var data = this.state.marker
        let point = []; //存放标注点经纬信息的数组
        let marker = []; //存放标注点对象的数组
        let info = []; //存放提示信息窗口对象的数组
        for (let i = 0, length = data.length; i < length; i++) {
            let px = data[i].point.split(",")[0]
            let py = data[i].point.split(",")[1] //按照原数组的point格式将地图点坐标的经纬度分别提出来
            point[i] = new BMap.Point(px, py) //循环生成新的地图点
            marker[i] = new BMap.Marker(point[i])//按照地图点坐标生成标记
            map.addOverlay(marker[i]);
            let label = new BMap.Label(data[i].id, {offset: new BMap.Size(20, -15)})
            label.setStyle({backgroundColor: "red", color: "white", fontSize: "12px"})
            marker[i].setLabel(label)
            info[i] = new BMap.InfoWindow("<p class='bdmap-info'>" + data[i].title + "</p>" +
                "<p class='bdmap-info'>地址：" + data[i].address + "</p>" +
                "<p class='bdmap-info'>联系人：" + data[i].linkMan + "</p>" +
                "<p class='bdmap-info'> 电话：" + data[i].telephone + "</p>")// 创建信息窗口对象

            marker[i].addEventListener("mouseover", function () {
                this.openInfoWindow(info[i])
            })
        }
    }

    onCitySelect(value) {//选择城市
        if (value === "全国") {
            this.bdMapCity("上海市", 6)
        } else {
            this.bdMapCity(value, 12)
        }
    }

    onProSelect(value) {//选择项目（工程、搅拌车、搅拌站、全部）

    }

    componentDidMount() {
        this.bdMapInit()
        this.bdMapMarker()
    }

    onSearch(value) {//地图搜素事件

    }

    render() {
        const province = []
        for (let i = 0; i < cityName.data.length; i++) {
            let city = []
            for (let y = 0; y < cityName.data[i].c.length; y++) {
                city.push(<Option value={cityName.data[i].c[y]}>{cityName.data[i].c[y]}</Option>)
            }
            province.push(<OptGroup label={cityName.data[i].p}>{city}</OptGroup>)
        }
        return (
            <div className="geo">
                <div className="geo-search">
                    <Search onSearch={this.onSearch.bind(this)} defaultValue="加油站"/>
                </div>
                <div className="geo-city">
                    <Select defaultValue="全国"
                            style={{width: 100}}
                            showSearch={true}
                            onSelect={this.onCitySelect.bind(this)}
                    >
                        {province}
                    </Select>
                    <Select defaultValue="all"
                            style={{width: 150}}
                            showSearch={true}
                            onSelect={this.onProSelect.bind(this)}
                    >
                        <Option value="all">全部</Option>
                        <Option value="project">工程</Option>
                        <Option value="mixer">搅拌车</Option>
                        <Option value="mixingStation">搅拌站</Option>
                    </Select>
                </div>

                <div id="index-map"></div>
            </div>
        );
    }
}