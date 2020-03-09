# nodejs-payment
> payment nodejs library

## Install
```
> npm install nodejs-payment --save-dev
```

## Usage
require
```js
// app.js
const config = require('./config.js');
const Payment = require('nodejs-payment');
let client_ip = "127.0.0.1";
let order_id = Date.now();
let title = "payment test";
let amount = 1;
// wepay
new Payment(config).webPay("wepay", client_ip, order_id, title, amount).them(url => {
    // payment url
});

// alipay
new Payment(config).webPay("alipay", client_ip, order_id, title, amount).them(url => {
    // payment url
});
```

config
```js
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
webPay | ✔  | ✔  |
queryPay | ✔  | ✔  |
transfers | ✔ | - |
queryTransfers | ✔ | - |