var crawler = require("./crawler"),
    parseCity = require("./parseCity");

var areaUrl = process.argv[2] || "http://house.focus.cn/jiameng/sitemap.php";

//todo参数问题
if(areaUrl) {
    crawl(areaUrl);
}

function crawl(areaUrl) {
    crawler.getUrl({url: areaUrl}, function(err, res) {
        if(!err) {
            var json = parseCity.parse(res.body);

            /*
            var buf = require("fs").readFileSync("./html/sitemap.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            json = parseCity.parse(body);
            */

            require("fs").writeFile("./json/city.json", JSON.stringify(json), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
