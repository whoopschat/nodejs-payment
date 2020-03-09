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
webPay | ✔  | ✔  |
queryPay | ✔  | ✔  |
transfers | ✔ | - |
queryTransfers | ✔ | - |