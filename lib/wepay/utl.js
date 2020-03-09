const request = require('request');
const crypto = require('crypto');
const xml2js = require('xml2js');

function _parseXML(xml, cb) {
    let parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });
    parser.parseString(xml, function (err, data) {
        cb && cb(data);
    })
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateNonceStr() {
    return uuidv4().toString().replace(/-/g, "");
}

function asciiObjectToString(obj) {
    return Object.keys(obj).sort().map(k => `${k}=${obj[k]}`).join("&");
}

function generateSign(stringA, key, method = "md5") {
    if (method.toLowerCase() == "md5")
        return crypto.createHash("md5").update(stringA.toString() + "&key=" + key.toString()).digest("hex").toUpperCase();
    if (method.toLowerCase() == "sha256")
        return crypto.createHmac("sha256", key).update(stringA).digest("hex").toUpperCase();
    return null;
}

function sendRequest({ method, url, data, agentOptions }) {
    let builder = new xml2js.Builder({
        rootName: "xml",
        cdata: true,
    });
    let body = builder.buildObject(data);
    let params = {
        method,
        url,
        body,
        agentOptions,
        headers: {
            "Content-Type": "text/xml"
        }
    }
    return new Promise((resolve, reject) => {
        request(params, function (err, response, responseBody) {
            if (!err && response.statusCode == 200) {
                _parseXML(responseBody.toString('utf-8'), (data) => {
                    resolve(data.xml || {})
                })
            } else {
                reject(err);
            }
        })
    })
}

module.exports = {
    asciiObjectToString,
    generateNonceStr,
    generateSign,
    sendRequest
}