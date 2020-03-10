const utl = require('./utl');

class Wepay {

    constructor(opts) {
        this.mchId = opts.mchId;
        this.appId = opts.appId;
        this.appKey = opts.appKey;
        this.notifyUrl = opts.notifyUrl;
        this.redirectUrl = opts.redirectUrl;
        this.certPem = `-----BEGIN CERTIFICATE-----\n${opts.certPem}\n-----END CERTIFICATE-----`;
        this.keyPem = `-----BEGIN PRIVATE KEY-----\n${opts.keyPem}\n-----END PRIVATE KEY-----`;
    }

    // web pay
    webPay(out_trade_id, title, amount, client_ip) {
        let spbill_create_ip = client_ip || '127.0.0.1';
        let attach = 'mweb';
        let body = title;
        let total_fee = amount;
        let out_trade_no = `${out_trade_id}`;
        let nonce_str = utl.generateNonceStr();
        let trade_type = "MWEB";
        let sign_type = "MD5";
        let signObj = {
            appid: this.appId,
            mch_id: this.mchId,
            nonce_str,
            body,
            out_trade_no,
            total_fee,
            spbill_create_ip,
            attach,
            trade_type,
            sign_type,
            notify_url: this.notifyUrl
        }
        let sign = utl.generateSign(utl.asciiObjectToString(signObj), this.appKey, sign_type);
        return utl.sendRequest({
            method: "POST",
            agentOptions: {
                key: this.keyPem,
                cert: this.certPem
            },
            url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
            data: Object.assign({}, signObj, { sign })
        }).then(res => {
            if (res.err_code) {
                throw res;
            }
            return res;
        }).then(res => {
            if (res.mweb_url) {
                return res.mweb_url + '&redirect_url=' + encodeURIComponent(`${this.redirectUrl}?type=wepay&out_trade_no=${out_trade_no}`);
            } else {
                throw res;
            }
        });
    }

    // query pay
    queryPay(trade_id) {
        let nonce_str = utl.generateNonceStr();
        let sign_type = "MD5";
        let signObj = {
            appid: this.appId,
            mch_id: this.mchId,
            out_trade_no: `${trade_id}`,
            nonce_str,
            sign_type
        };
        let signStr = utl.asciiObjectToString(signObj);
        let sign = utl.generateSign(signStr, this.appKey, sign_type);
        return utl.sendRequest({
            method: "POST",
            url: "https://api.mch.weixin.qq.com/pay/orderquery",
            data: Object.assign({}, signObj, { sign })
        }).then(res => {
            if (res.err_code) {
                throw res;
            }
            return res;
        }).then(res => {
            if (res.trade_state == "SUCCESS") {
                return res;
            }
            throw res;
        });
    }

    // transfers
    transfers(trans_trade_id, account, realname, title, amount, client_ip) {
        let spbill_create_ip = client_ip || '127.0.0.1';
        let nonce_str = utl.generateNonceStr();
        let sign_type = "MD5";
        let signObj = {
            mchid: this.mchId,
            mch_appid: this.appId,
            openid: account,
            partner_trade_no: `${trans_trade_id}`,
            check_name: 'NO_CHECK',
            spbill_create_ip,
            amount,
            desc: title,
            nonce_str
        }
        let signStr = utl.asciiObjectToString(signObj);
        let sign = utl.generateSign(signStr, this.appKey, sign_type);
        return utl.sendRequest({
            method: "POST",
            agentOptions: {
                key: this.keyPem,
                cert: this.certPem
            },
            url: "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers",
            data: Object.assign({}, signObj, { sign })
        }).then(res => {
            if (res.err_code) {
                throw res;
            }
            return res;
        });
    }

    // query transfers
    queryTransfers(trans_trade_id) {
        let nonce_str = utl.generateNonceStr();
        let sign_type = "MD5";
        let signObj = {
            mch_id: this.mchId,
            appid: this.appId,
            partner_trade_no: `${trans_trade_id}`,
            nonce_str
        }
        let signStr = utl.asciiObjectToString(signObj);
        let sign = utl.generateSign(signStr, this.appKey, sign_type);
        return utl.sendRequest({
            method: "POST",
            agentOptions: {
                key: this.keyPem,
                cert: this.certPem
            },
            url: "https://api.mch.weixin.qq.com/mmpaymkttransfers/gettransferinfo",
            data: Object.assign({}, signObj, { sign })
        }).then(res => {
            if (res.err_code) {
                throw res;
            }
            return res;
        });
    }

}

module.exports = Wepay;