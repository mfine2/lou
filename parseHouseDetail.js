var cheerio = require("cheerio"),
    utils = require("./utils");

var result = {};

function parse(body, curUrl) {
    var $ = cheerio.load(body);
    var houseName = $(".houseName.area")[0];
    var $houseName = $(houseName);
    var $left = $houseName.children(".left").children("h1");
    var $right = $houseName.children(".right");
    var name = $left.find("a").first().text();
    var status = $left.find("span").first().attr("class");
    var update = $right.children("span").first().text();

    result.name = name;
    result.status = getStatus(status);
    result.update = getUpdate(update);

    var recommend = $(".navBox").children(".bot").first().text();
    if(recommend) {
        recommend = recommend.split("：")
        result.recommend = recommend[1];
    }

    var $list = $(".cutA.area").find(".lboxA").first();
    var props = $list.children("h3");
    var vals = $list.children("div");

    var index = 0;
    props.each(function(i, el) {
        var $el = $(el);
        var prop = $el.text();
        prop = prop.substring(prop.length - 4);
        var val;

        if($el.prev().hasClass("boxB")) {
            index++;   
        }

        var $val = $(vals[index]);
        if(!$val.hasClass("boxC")){
            val = [];

            var items =$val.children("ul").children("li");
            items.each(function(j, elem) {
                var $elem = $(elem);
                var $label = $elem.children("label").first();
                var k = $label.text();
                var v = $elem.text().replace(k, "");
                k = k.substring(0, k.length - 1);//after repalce in v, how to get text?
                var obj = {};
                obj[k] = v;
                val.push(obj);
            });
        } else {
            val = $val.html().replace(/<.+>/ig, " ");//todo like: <a>text</a>
        }

        index++;
        result[prop] = val;
    });


    //console.log(result);
    return result;
}

function getStatus(status) {
    var obj = {"daiShou": "待售", "zaiShou": "在售", "shouWan": "售完"};
    return obj[status];
}

function getUpdate(update) {
    return update.substring(4, 14);
}

exports.parse = parse;
