const fs = require('fs');
const path = require('path');

const manifest = {
   name: "clicks",
   version: "1.0",
   description: "Chrome extension for counting clicks",
   manifest_version: 2,
   permissions: [
      "input",
      "storage",
      "identity"
   ],
   background: {
      scripts: [
         "background.js"
      ],
      persistent: true
   },
   content_scripts: [
      {
         matches: [
            "<all_urls>"
         ],
         js: [
            "contentScript.js"
         ]
      }
   ],
   chrome_url_overrides: {
      newtab: "index.html"
   },
   content_security_policy: "script-src 'self' 'sha256-q7IxwxOOIqS0aDLSUDnn1CbBfShDkY4/53yvM9biSjo='; object-src 'self'",
   key: process.env.CLICKS_APP_KEY,
   oauth2: {
      client_id: process.env.CLICKS_CLIENT_ID,
      scopes: [
         "openid",
         "email",
         "profile"
      ]
   }
}

const manifestFile = path.join(__dirname, 'chrome-extension', 'public', 'manifest.json');
fs.writeFileSync(manifestFile, JSON.stringify(manifest));