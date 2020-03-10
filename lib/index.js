const wepay = require('./wepay');
const alipay = require('./alipay');

class Payment {

    constructor(opts, clientIp) {
        this.opts = opts;
        this.clientIp = clientIp;
    }

    webPay(type, out_trade_id, title, amount) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type], this.clientIp);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type], this.clientIp);
        }
        if (payObj != null) {
            return payObj.webPay(out_trade_id, title, amount)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    queryPay(type, trade_id) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type], this.clientIp);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type], this.clientIp);
        }
        if (payObj != null) {
            return payObj.queryPay(trade_id)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    transfers(type, trans_trade_id, account, realname, title, amount) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type], this.clientIp);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type], this.clientIp);
        }
        if (payObj != null) {
            return payObj.transfers(trans_trade_id, account, realname, title, amount)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    queryTransfers(type, trans_trade_id) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type], this.clientIp);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type], this.clientIp);
        }
        if (payObj != null) {
            return payObj.queryTransfers(trans_trade_id)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

}

module.exports = Payment;