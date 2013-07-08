var cheerio = require("cheerio");

function parse(body, baseUrl) {
    var $ = cheerio.load(body);
    var container = $("#LPSS").siblings(".page")[0];
    var totalPage = $(container).children("a").eq(-3);
    var totalNum = $(totalPage).text();
    return totalNum || -1;
}

exports.parse = parse;
