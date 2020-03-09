const wepay = require('./wepay');
const alipay = require('./alipay');

class Payment {

    constructor(opts) {
        this.opts = opts;
    }

    webPay(type, ...params) {
        if (type == 'wepay' && this.opts && this.opts[type]) {
            return new wepay(this.opts[type]).webPay(...params);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            return new alipay(this.opts[type]).webPay(...params);
        }
        return Promise.reject('不支持的支付方式')
    }

    queryPay(type, ...params) {
        if (type == 'wepay' && this.opts && this.opts[type]) {
            return new wepay(this.opts[type]).queryPay(...params);
        } else if (type == 'alipay' && this.opts && this.opts[type]) {
            return new alipay(this.opts[type]).queryPay(...params);
        }
        return Promise.reject('不支持的支付方式')
    }

    transfers(type, ...params) {
        if (type == 'wepay' && this.opts && this.opts[type]) {
            return new wepay(this.opts[type]).transfers(...params);
        }
        return Promise.reject('不支持的提现方式')
    }

    queryTransfers(type, ...params) {
        if (type == 'wepay' && this.opts && this.opts[type]) {
            return new wepay(this.opts[type]).queryTransfers(...params);
        }
        return Promise.reject('不支持的提现方式')
    }

}

module.exports = Payment;