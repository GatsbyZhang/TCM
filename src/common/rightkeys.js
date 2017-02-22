/**
 * Created by SWSD on 2017-01-09.
 */
module.exports = function (callback, copy) {
    $("table.ui-jqgrid-btable:not(table.option-record)").contextPopup({
        title: '操作菜单',
        items: [
            {
                label: '查看', icon: '/static/rightkeys/icons/shopping-basket.png', action: function (e) {
                let rowId = e.target.parentNode.id;
                let tableId = '#' + $(e.target.parentNode).closest('table').get(0).id;
                if (callback) {
                    if (tableId == '#register-list1' || tableId == '#register-list2' || tableId == '#sendGoods-list1' || tableId == '#sendGoods-list2' || tableId == '#sendGoods-list3'
                        || tableId == '#sendGoods-list4' || tableId == '#sendGoods-list5' || tableId == '#sendGoods-list6' || tableId == '#sendGoods-list7' || tableId == '#sendGoods-list8'
                        || tableId == '#sendGoods-list9' || tableId == '#sendGoods-list10' || tableId == '#sendGoods-list11' || tableId == '#userMng-table'
                        || tableId == '#cars-table') {
                        callback(rowId, {type: "show"})
                    }
                    else {
                        callback({visible: true})
                    }
                }
                else {
                    alert("该项不支持查看")
                }
            }
            },

            {
                label: '新增', icon: '/static/rightkeys/icons/receipt-text.png', action: function (e) {
                let rowId = e.target.parentNode.id;
                let tableId = '#' + $(e.target.parentNode).closest('table').get(0).id;
                if (callback) {
                    if (tableId == '#register-list1' || tableId == '#register-list2' || tableId == '#sendGoods-list1' || tableId == '#sendGoods-list2' || tableId == '#sendGoods-list3'
                        || tableId == '#sendGoods-list4' || tableId == '#sendGoods-list5' || tableId == '#sendGoods-list6' || tableId == '#sendGoods-list7' || tableId == '#sendGoods-list8'
                        || tableId == '#sendGoods-list9' || tableId == '#sendGoods-list10' || tableId == '#sendGoods-list11' || tableId == '#userMng-table'
                        || tableId == '#cars-table') {
                        callback('', {type: "add"})
                    }
                    else {
                        callback({visible: true})
                    }
                }
                else {
                    alert("该项不支持查看")
                }
            }
            },

            {
                label: '删除', icon: '/static/rightkeys/icons/book-open-list.png', action: function (e) {
                alert("当前列表不支持该操作！！！")
            }
            },

            null, // divider

            {
                label: '选择', icon: '/static/rightkeys/icons/application-monitor.png', action: function (e) {
                alert("当前列表不支持该操作！！！")
            }
            },

            {
                label: '复制', icon: '/static/rightkeys/icons/bin-metal.png', action: function (e) {
                alert("当前列表不支持该操作！！！")
            }
            },
            {
                label: '克隆', icon: '/static/rightkeys/icons/magnifier-zoom-actual-equal.png', action: function (e) {
                let rowId = e.target.parentNode.id;
                let tableId = '#' + $(e.target.parentNode).closest('table').get(0).id;
                if (copy) {
                    if (tableId == '#register-list1' || tableId == '#register-list2' || tableId == '#sendGoods-list1' || tableId == '#sendGoods-list2' || tableId == '#sendGoods-list3'
                        || tableId == '#sendGoods-list4' || tableId == '#sendGoods-list5' || tableId == '#sendGoods-list6' || tableId == '#sendGoods-list7' || tableId == '#sendGoods-list8'
                        || tableId == '#sendGoods-list9' || tableId == '#sendGoods-list10' || tableId == '#sendGoods-list11' || tableId == '#userMng-table'
                        || tableId == '#cars-table') {
                        callback(rowId, {type: "add"});
                        copy(rowId)
                    }
                    else {
                        copy({visible: true})
                    }
                }
                else {
                    alert("该项不支持查看")
                }
            }
            }

        ]

    })
};


