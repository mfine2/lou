var crawler = require("./crawler"),
    parseHouseMap = require("./parseHouseMap");

var mapUrl = process.argv[2] || "http://map.sogou.com/house/partner/0_0_30_301069.htm?w=0";

//todo参数问题
if(mapUrl) {
    crawl(mapUrl);
}

function crawl(areaUrl) {
    crawler.getUrl({url: mapUrl}, function(err, res) {
        if(!err) {
            var json = parseHouseMap.parse(res.body);

            /*
            var buf = require("fs").readFileSync("./html/house_map.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            json = parseHouseMap.parse(body, mapUrl);
            */

            require("fs").writeFile("./json/house_map.json", JSON.stringify(json), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
