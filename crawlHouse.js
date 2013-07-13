var crawler = require("./crawler"),
    parseHouse = require("./parseHouse");

var houseUrl = process.argv[2] || "http://dl.focus.cn/votehouse/1071.html";

//todo参数问题
if(houseUrl) {
    crawl(houseUrl);
}

function crawl(houseUrl) {
    crawler.getUrl({url: houseUrl}, function(err, res) {
        if(!err) {
            var json = parseHouse.parse(res.body, houseUrl);

            /*
            var buf = require("fs").readFileSync("./html/house.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            json = parseHouse.parse(body, houseUrl);
            */

            require("fs").writeFile("./json/house.json", JSON.stringify(json), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
