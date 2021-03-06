/**
 * app 内置方法
 */
$(function () {
    $(".closeNowLayer").click(function () {
        closeCurrentIframe();
    });
})
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
Date.prototype.format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function closeCurrentIframe() {
    var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    parent.layer.close(index);
}

/*
 * 获取表单参数 定制为在class为layui-form下的class为data-param的表单参数，
 */
function getParam(jqDom) {
    let param = {};
    $.each(jqDom.find(".layui-form .data-param,input,select,textarea"), function () {
        let nodeName = $(this).context.nodeName.toLowerCase();
        let attrName = $(this).attr("name");
        let attrType = $(this).attr("type");
        if (nodeName == "textarea" || nodeName == "div") {
            param[attrName] = $(this)[0].value;
        } else {
            if (attrType == "radio" || attrType == "checkbox") {
                if ($(this).is(":checked")) {
                    param[attrName] = $(this).val();
                }
            } else {
                param[attrName] = $(this).val();
            }
        }
    });
    return param;
}

function getLayeroParam(layero) {
    return getParam(layero.find("iframe")[0].contentWindow.$);
}

/**
 * 重载上层数据表格
 */
function reloadParentTable() {
    parent.$.find(".layui-show iframe")[0].contentWindow.tableReload();
}

/*
 * layui数据表格排序监听事件 layuiTable layui表格对象 tableId table元素id
 */
function sortEventListen(layuiTable, layFilter, tableId) {
    layuiTable.on('sort(' + layFilter + ')', function (obj) { // 注：tool是工具条事件名，data-table是table原始容器的属性
        layuiTable.reload(tableId, {
            initSort: obj,
            where: { // 请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                orderName: obj.field,
                order: obj.type
            }
        });
    });
}

/*
 * 打开表单
 * title 标题
 * url 请求路径
 * isTop 是否在顶层的基础上打开图层，默认false
 */
function openCommonForm(table, tableId, title, url, area, isTop) {
    isTop = isTop != undefined ? isTop : false;
    var options = {
        type: 2,
        title: title,
        content: url,
        area: area ? area : ["90%", "90%"],
        skin: 'layui-layer-molv',
        shade: 0.3,
        maxmin: true,
        resize: true,
        moveOut: true,
        zIndex: layer.zIndex, //多窗口模式，层叠打开
        end: function () {
            table.reload(tableId);
        }
    };
    if (isTop) {
        top.layer.open(options);
    } else {
        layer.open(options);
    }
}
