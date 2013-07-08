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
            var list = parseCityPageList.parse(res.body, baseUrl);
            //todo
            var buf = require("fs").readFileSync("./html/firstpage.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            list = parseCityPageList.parse(body, baseUrl);
            //todo end
            require("fs").writeFile("./json/page_list.json", JSON.stringify(list), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
