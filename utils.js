
function merge(obj1, obj2) {
    var prop, obj = {};
    for (prop in obj1) {
        obj[prop] = obj1[prop];
    }
    for (prop in obj2) {
        obj[prop] = obj2[prop];
    }
    return obj;
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/, "");
}

exports.merge = merge;
exports.trim = trim;
