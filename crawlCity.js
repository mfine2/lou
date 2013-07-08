var crawler = require("./crawler"),
    parseCity = require("./parseCity");

var areaUrl = process.argv[2] || "http://house.focus.cn/jiameng/sitemap.php";

//todo参数问题
if(areaUrl) {
    crawl(areaUrl);
}

function crawl(areaUrl) {
    var headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        //"Accept-Encoding": "gzip,deflate,sdch",
        "Accept-Language": "zh-CN,zh;q=0.8",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "house.focus.cn",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.94 Safari/537.36"
    };
            
    crawler.getUrl({url: areaUrl, headers: headers}, function(err, res) {
        if(!err) {
            //console.log(areaUrl);
            //console.log(res.headers);
            var arr = parseCity.parse(res.body);

            //todo
            var buf = require("fs").readFileSync("./html/sitemap.html");
            var body = require("iconv-lite").decode(buf, "gb2312");
            arr = parseCity.parse(body);
            //todo end

            require("fs").writeFile("./json/city.json", JSON.stringify(arr), function(err){
                if(err) throw err;
            });
        } else {
        }
    });
}

exports.crawl = crawl;
