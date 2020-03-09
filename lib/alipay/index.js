const utl = require('./utl');
const alipay_gate_way = 'https://openapi.alipay.com/gateway.do';
const alipay_gate_way_sandbox = 'https://openapi.alipaydev.com/gateway.do';

class Alipay {

    constructor(opts) {
        this.appId = opts.appId;
        this.notifyUrl = opts.notifyUrl;
        this.returnUrl = opts.returnUrl;
        this.signType = opts.signType;
        this.privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${opts.privateKey}\n-----END RSA PRIVATE KEY-----`;
        this.publicKey = `-----BEGIN PUBLIC KEY-----\n${opts.publicKey}\n-----END PUBLIC KEY-----`;
        this.sandbox = !!opts.sandbox;
    }

    _makeParams(method, biz_content) {
        return {
            app_id: this.appId,
            method: method,
            format: 'JSON',
            charset: 'utf-8',
            sign_type: this.signType,
            timestamp: new Date().format('yyyy-MM-dd hh:mm:ss'),
            version: '1.0',
            biz_content: JSON.stringify(biz_content)
        }
    }

    // web pay
    webPay(client_ip, trade_id, title, amount) {
        var biz_content = {
            body: title,
            subject: title,
            out_trade_no: trade_id,
            total_amount: `${(amount / 100).toFixed(2)}`,
            goods_type: 0,
            product_code: 'QUICK_WAP_PAY',
        };
        var params = this._makeParams('alipay.trade.wap.pay', biz_content);
        params.notify_url = this.notifyUrl;
        params.return_url = this.returnUrl;
        let payment_url = (this.sandbox ? alipay_gate_way_sandbox : alipay_gate_way) + '?' + utl.processParams(params, this.privateKey, this.signType);
        return Promise.resolve(payment_url);
    }

    // query pay
    queryPay(out_trade_no, trade_no) {
        var biz_content = {
            out_trade_no: out_trade_no,
            trade_no: trade_no
        };
        var params = this._makeParams('alipay.trade.query', biz_content);
        var body = utl.processParams(params, this.privateKey, this.signType);
        return utl.request({
            method: 'GET',
            json: true,
            url: (this.sandbox ? alipay_gate_way_sandbox : alipay_gate_way) + '?' + body
        }).then(data => {
            if (data.alipay_trade_query_response && data.alipay_trade_query_response.msg == 'Success') {
                return data.alipay_trade_query_response;
            }
            throw data;
        }).then(data => {
            if (data.trade_status == "TRADE_SUCCESS" || data.trade_status == "TRADE_FINISHED") {
                return data;
            }
            throw data;
        });
    }

}

module.exports = Alipay;