var cheerio = require("cheerio"),
    utils = require("./utils");

var result = {};

function parse(body, curUrl) {
    //var g_Jason_House= {id:"1_D_FOCUS_0_0_30_301069",caption:"君海阁",price:"10800元/平方米",status:"在售",point:"13527874.99,4673078.12",url:"http://dl.focus.cn/votehouse/301069/dianping/" };
    var reg = /g_Jason_House\s?=\s?(.+);/;
    var mapStr = body.match(reg)[1];
    var obj = eval("(" + mapStr + ")" );

    result.caption = obj.caption;
    result.price = obj.price;
    result.status = obj.status;
    result.point = obj.point;
    
    return result; 
}

exports.parse = parse;
