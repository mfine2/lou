var cheerio = require("cheerio"),
    utils = require("./utils");

function parse(body) {
    var $ = cheerio.load(body);
    var $container = $("#MATjiameng_sitemap_left");
    var areaContainer = $container.children("h2");
    var cityContainer = $container.children("p");

    var areaArr = [];
    areaContainer.each(function(i, el) {
        var $el = $(el);
        var areaName = $el.text() || "";
        areaArr.push(areaName);
    });

    var jsonArr = [];
    cityContainer.each(function(i, el) {
        var $el = $(el);
        var cities = $el.children("a");

        var cityArr = [];
        var areaObj = {};
        cities.each(function(i, elem) {
            var $elem = $(elem);
            var trim = utils.trim;
            var obj = {};
            var name = trim($elem.text() || "");
            var href = trim($elem.attr("href") || "");
            obj[name] = href;
            cityArr.push(obj);
        });
        var areaName = areaArr[i];
        areaObj[areaName] = cityArr;

        jsonArr.push(areaObj);
    });

    jsonArr.splice(jsonArr.length - 1, 1);

    return jsonArr;
}

exports.parse = parse;
