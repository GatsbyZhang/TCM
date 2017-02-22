//先要加载接口，要在函数外，保证先加载
document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=agYYOGPGUdzIGXZNUmP5Ur5LredR3irb"></script>');
document.write('<script charset=utf-8 type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>');
document.write('<link charset=utf-8 rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />');

//显示地图
//参数：显示容器ID，属性(city,addr,title,lawfirm,tel,user,mapx,pic,ismove,piobj,zoom)
function ShowMap(objname, options) {
    this._objname = objname
    if (options) {
        this._city = options.city ? options.city : ""; //城市
        this._addr = options.addr ? options.addr : ""; //地址
        this._mapx = options.mapx ? options.mapx : ""; //地图坐标
        this._ismove = options.ismove ? options.ismove : "0"; //是否拖动，1为拖动为设置标注，0为显示。默认0
        this._piobj = options.piobj ? options.piobj : ""; //接收拖动坐标经纬度的表单ID
        this._zoom = options.zoom ? options.zoom : "14"; //放大级别，默认14
        this._posm = options.posm ? options.posm : ""; //接收拖动坐标位置的表单ID
    }
    //设定初始坐标
    var point = new BMap.Point(121.5114, 31.314558);
    getLocalPosition(this._piobj,this._posm, point);
    //范围为3-18级
    var zoom = parseInt(this._zoom); //要转为数字

    //创建地图
    var map = new BMap.Map(this._objname);
    map.enableScrollWheelZoom();
    map.centerAndZoom(point, zoom);//设初始化地图。

    //向地图中添加缩略图控件
    var ctrlOve = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
    });
    map.addControl(ctrlOve);


    var poj = this._piobj; //在一些回调函数过程里不支持this，要传给变量
    var position = this._posm

    //坐标不为空时按坐标显示
    if (this._mapx != "") {
        var mx = this._mapx.substr(0, this._mapx.indexOf(","));
        var my = this._mapx.substr(this._mapx.indexOf(",") + 1);
        point = new BMap.Point(mx, my);
        map.centerAndZoom(point, zoom); //重新调整位置
        getLocalPosition(poj,position, point);
    }
    //否则按地址显示
    else if (this._addr != "") {
        //创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        //将地址解析结果显示在地图上，并调整地图视野。此过程为异步，所以要重设标注
        myGeo.getPoint(this._addr, function (poi) {
            map.centerAndZoom(poi, zoom);
            marker.setPosition(poi); //重调标注位置
        }, this._city);
    }
    //否则按城市显示
    else if (this._city != "") {
        map.setCenter(this._city); //设置地图中心点。
    }
    //都为空按IP定位
    else {
        //创建一个获取本地城市位置的实例
        var geolocation = new BMap.Geolocation();
        //获取位置
        geolocation.getCurrentPosition(function (rs) {
            map.setCenter(rs.point)
            getLocalPosition(poj,position, rs.point)
            marker.setPosition(rs.point); //重调标注位置
        })
    }

    //创建标注
    var marker = new BMap.Marker(point);
    map.addOverlay(marker); // 将标注添加到地图中

    //设置标注时
    if (this._ismove == "1") {
        marker.enableDragging(); //可拖拽
        var label = new BMap.Label("拖动选址", {offset: new BMap.Size(20, -15)});
        label.setStyle({backgroundColor: "red", color: "white", fontSize: "12px"});
        marker.setLabel(label);


        //拖拽设置位置
        marker.addEventListener("dragend", function (e) {
            getLocalPosition(poj,position, e.point)
        });
        //点击设置位置
        map.addEventListener("click", function (e) {
            getLocalPosition(poj,position, e.point)
            marker.setPosition(e.point); //重调标注位置
        });
    }
}

/*得到当前位置*/
function getLocalPosition(longitude,address, currentPoint) {
    new BMap.Geocoder().getLocation(currentPoint, function (rs) {
        var addComp = rs.addressComponents
        try {
            document.getElementById(longitude).value = currentPoint.lng + "," + currentPoint.lat;
            document.getElementById(address).value = addComp.province + addComp.city + addComp.district +
                addComp.street + addComp.streetNumber;
        } catch (ex) {
        }
    })
}