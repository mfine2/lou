var cheerio = require("cheerio"),
    utils = require("./utils");

var list = [];
var result = {};

function parse(body, curUrl) {
    var $ = cheerio.load(body);
    var items = $(".navBox > .top").find("a");

    items.each(function(i, el) {
        var trim = utils.trim;
        var $el = $(el);
        var obj = {};
        var name = trim($el.text() || "");
        var href = trim($el.attr("href") || "");
        obj[name] = href;
        list.push(obj);
    });

    //from string in body: var map_url = "http://map.sogou.com/house/partner/0_0_30_301069.htm?w=0";
    var reg = /map_url\s?=\s?"(.+)"/;
    var mapUrl = body.match(reg)[1];
    var mapObj = {"mapUrl": mapUrl};

    var curObj = {"curUrl": curUrl};
    list.push(curObj);

    result.curUrl = curUrl;
    result.urls = list;

    return result;
}

exports.parse = parse;
