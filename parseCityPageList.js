var cheerio = require("cheerio");

var list = [];

function parse(body, baseUrl) {
    var $ = cheerio.load(body);
    var listContainer = $("#LPSS").siblings(".searchList")[0];
    var items = $(listContainer).children(".box");

    items.each(function(i, el) {
        var $this = $(el);
        var link = $this.find("img").parent();
        var url = baseUrl + $(link).attr("href");
        list.push(url);
    });
    
    return list;
}

exports.parse = parse;
