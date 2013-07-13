var crawler = require("./crawler"),
    parseHouseDetail = require("./parseHouseDetail");

var detailUrl = process.argv[2] || "http://dl.focus.cn/votehouse/301069/xiangqing/";

//todo参数问题
if(detailUrl) {
    crawl(detailUrl);
}

function crawl(areaUrl) {
    crawler.getUrl({url: detailUrl}, function(err, res) {
        if(!err) {
            var json = parseHouseDetail.parse(res.body);

            /*
            var buf = require("fs").readFileSync("./html/house_detail.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            json = parseHouseDetail.parse(body, detailUrl);
            */

            require("fs").writeFile("./json/house_detail.json", JSON.stringify(json), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
