var url = require("url"),
    crawler = require("./crawler"),
    parseCityPageList = require("./parseCityPageList");

var pageUrl = process.argv[2] || "http://dl.focus.cn/search/0_0_0_0_0_0_0_0_0.html?&page=1&allpage=";

if(pageUrl) {
    crawl(pageUrl);
}

function crawl(pageUrl) {
    var fullUrl = url.parse(pageUrl);
    var baseUrl = fullUrl.protocol + "//" + fullUrl.hostname;

    crawler.getUrl({"url": pageUrl}, function(err, res) {
        if(!err) {
            var json = parseCityPageList.parse(res.body, baseUrl);

            /*
            var buf = require("fs").readFileSync("./html/firstpage.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            json = parseCityPageList.parse(body, baseUrl);
            */

            require("fs").writeFile("./json/page_list.json", JSON.stringify(json), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
