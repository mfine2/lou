var crawler = require("./crawler"),
    parseCityPageUrls = require("./parseCityPageUrls");

var cityUrl = process.argv[2] || "http://dl.focus.cn/";

if(cityUrl) {
    crawl(cityUrl);
}


function crawl(cityUrl) {
    var list = [];

    var indexPageUrl = getFullPath(cityUrl, 1);
    crawler.getUrl({url: indexPageUrl}, function(err, res) {
        if(!err) {
            var totalNum = parseCityPageUrls.parse(res.body);

            /*
            var buf = require("fs").readFileSync("./html/firstpage.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            totalNum = parseCityPageUrls.parse(body);
            */
            
            for(var i = 1; i <= totalNum; i++) {
                var pageUrl = getFullPath(cityUrl, i);
                list.push(pageUrl);
            }

            require("fs").writeFile("./json/page_urls.json", JSON.stringify(list), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

function getFullPath(cityUrl, page) {
    return cityUrl +  "search/0_0_0_0_0_0_0_0_0.html?&page=" + page + "&allpage=";
}

exports.crawl = crawl;
