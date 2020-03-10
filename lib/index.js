const wepay = require('./wepay');
const alipay = require('./alipay');

class Payment {

    constructor(opts) {
        this.opts = opts;
    }

    webPay(type, out_trade_id, title, amount, client_ip) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type]);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type]);
        }
        if (payObj != null) {
            return payObj.webPay(out_trade_id, title, amount, client_ip)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    queryPay(type, trade_id) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type]);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type]);
        }
        if (payObj != null) {
            return payObj.queryPay(trade_id)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    transfers(type, trans_trade_id, account, realname, title, amount, client_ip) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type]);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type]);
        }
        if (payObj != null) {
            return payObj.transfers(trans_trade_id, account, realname, title, amount, client_ip)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

    queryTransfers(type, trans_trade_id) {
        let payObj;
        if (type == 'wepay' && this.opts && this.opts[type]) {
            payObj = new wepay(this.opts[type]);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            payObj = new alipay(this.opts[type]);
        }
        if (payObj != null) {
            return payObj.queryTransfers(trans_trade_id)
        }
        return Promise.reject(`Invalid type [${type}]`)
    }

}

module.exports = Payment;