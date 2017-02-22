/**
 * Created by SWSD on 2017-01-09.
 */
module.exports = function (callback) {
    $('table.ui-jqgrid-btable').contextPopup({
        title: '操作菜单',
        items: [
            {
                label: '查看', icon: '/static/rightkeys/icons/shopping-basket.png', action: function (e) {
                let id = e.target.parentNode.id;
                callback(id)
            }
            }]
    });
};


