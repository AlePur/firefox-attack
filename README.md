# firefox-attack
Hijack proxy-failover browser feature to introduce an unsigned, malicious, hidden extension. 👍 
火狐浏览器键盘记录器

Proxy Failover seems the most useless of these features. The following features can be seen in `about:support`:
![image](https://user-images.githubusercontent.com/35966625/152403536-b9a054fe-ce01-415e-9f72-db51be717c6d.png)

The features can be found in `C:\Program Files\Mozilla Firefox\browser\features`:

![image](https://user-images.githubusercontent.com/35966625/152403854-bf77543a-ab37-4a6a-acd5-64b62fc769f5.png)

`.xpi` files are `.zip` files renamed.

Using `npm i web-ext && npx web-ext build` we create our own `.xpi` extension. Mind that replacing files in `C:\Program Files\Mozilla Firefox\browser\features` requires administrator privileges.

Browser features are hidden extensions by default and have access to incognito windows. As can be seen in the default `extension-preferences.json` file.

![image](https://user-images.githubusercontent.com/35966625/152405295-07fea8b5-b5e4-4ac4-a04c-151002774860.png)

The only thing to complete our attack is to modify the permissions of `proxy-failover@mozilla.com` in `extensions.json`.

Change 
```json
"userPermissions": {
  "permissions": [],
  "origins": []
},
```
To
```json
"userPermissions": {
  "permissions": [
    "unlimitedStorage",
    "clipboardRead",
    "storage"
  ],
  "origins": [
    "<all_urls>"
  ]
},
```