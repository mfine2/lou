var http = require("http"),
    parse = require("url").parse,
    iconv = require("iconv-lite"),
    utils = require("./utils");

//todo
//对非200返回码的处理
//对编码的处理，header or content-type
//对日期的判断，即只比较header

function getUrl (options, callback) {
    var defaults = {
        url: "http://cawler.try4.cn",
        encoding: "gb2312",
        headers: {},
        reqTimeout: 5000,
        resTimeout: 5000 
    };

    options = utils.merge(defaults, options);

    var urlInfo = parse(options.url),
        urlPath = urlInfo.urlPathname + (urlInfo.search || ""),
        reqOpt = { 
            host: urlInfo.hostname,
            port: urlInfo.port || 80,
            urlPath: urlPath,
            headers: options.headers,
            method: "GET"
        };

    var req = null,
        reqTimeout = null;

    reqTimeout = setTimeout(function() {
        reqTimeout = null;
        req.abort();
        callback(new Error("Request Timeout"));
    }, options.reqTimeout);

    req = http.request(reqOpt, function(res) {
        clearTimeout(reqTimeout);

        var chunks = [],
            length = 0,
            responseTimeout = null;

        resTimeout = setTimeout(function() {
            resTimeout = null;
            req.abort();
            callback(new Error("Response Timeout"));
        }, options.resTimeout);

        res.on("data", function(chunk) {
            length += chunk.length;
            chunks.push(chunk);
        }).on("end", function() {
            if(resTimeout) {
                clearTimeout(resTimeout);

                var data = new Buffer(length);

                for(var i = 0, pos = 0, len = chunks.length; i < len; i++) {
                    chunks[i].copy(data, pos);
                    pos += chunks[i].length;
                }

                res.body = iconv.decode(data, options.encoding);
                callback(null, res);
            }
        }).on("error", function(err) {
            clearTimeout(resTimeout);
            callback(err, res);
        }).on("aborted", function() {
            if(resTimeout) {
                callback(new Error("Response Aborted"), res);
            }
        });
    }).on("error", function(err) {
        if(reqTimeout) {
            clearTimeout(reqTimeout);
            callback(err);
        }
    });
    req.end();
}

exports.getUrl = getUrl;
