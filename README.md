# nodejs-payment
> payment nodejs library

## Install
```
> npm install nodejs-payment --save-dev
```

## Usage

### app.js
```js
// app.js
const config = require('./config.js');
const Payment = require('nodejs-payment');
let type = "wepay"; // or "alipay"
let client_ip = "127.0.0.1";
let order_id = Date.now();
let title = "payment test";
let amount = 1;
// create payment url 
new Payment(config).webPay(type, client_ip, order_id, title, amount).then(url => {
    // open this url go pay
});
```

### config.js
```js
// config.js
'use strict';

module.exports = {
    alipay: {
        sandbox: false,
        appId: "--appId--",
        publicKey: "--publicKey--",
        privateKey: "--privateKey--",
        notifyUrl: "--notifyUrl--",
        returnUrl: "--returnUrl--",
        signType: "RSA2"
    },
    wepay: {
        mchId: "--mchId--",
        appId: "--appId--",
        appKey: "--appKey--",
        notifyUrl: "--notifyUrl--",
        redirectUrl: "--redirectUrl--",
        certPem: "--publicKey--",
        keyPem: "--privateKey--"
    }
}
```


## Features

feature | wepay |  alipay
-|-|-
`webPay(client_ip, out_trade_id, title, amount)` | ✔  | ✔  |
`queryPay(trade_id, trade_no)` | ✔  | ✔  |
`transfers(client_ip, open_id, partner_trade_id, title, amount)` | ✔ | - |
`queryTransfers(partner_trade_id)` | ✔ | - |

## Docs

[wepay docs](https://pay.weixin.qq.com/wiki/doc/api/index.html)

[alipay docs](https://open.alipay.com/developmentDocument.htm)