# Wallet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

npm i @angular/cli@7.3.8 or 1.7.3
npm rebuild node-sass
ng serve

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## how to fix the issue with python
Use Administrator-powershell run 'npm install -g windows-build-tools@1.3.2'
Wait for it finish (will take some time);

## how to fix the missing scss

npm i node-sass -save

## how to fix the compile bug:TypeError: crypto.createHmac is not a function
go to node_modules\hdkey\lib\hdkey.js file,
change var "crypto = require('crypto')" to "var crypto = require('crypto-browserify')"
after that goto node_modules\web3-eth-accounts\src\index.js file,
change "var cryp = (typeof global === 'undefined') ? require('crypto-browserify') : require('crypto');" to "var cryp = require('crypto-browserify');"


##useful command
node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild


npm config set python C:\Users\Ray\AppData\Local\Programs\Python\Python35\python.exe


node-gyp rebuild

npm node-gyp rebuild

scripts/npm.bat install --msvs_version=2015

npm install --msvs_version=2015

npm --add-python-to-path='true' --debug install --global windows-build-tools
npm --add-python-to-path='true' --debug install --global windows-build-tools

npm install sass-loader

npm install -g node-gyp
npm install sass-loader
npm rebuild node-sass
npm install -g node-sass

## console.log and production mode
In production mode, we omit all the console.log commands in development. This is made possible by adding "window.console.log = function(){};" within "if(environment.production){}" in main.ts. 

## billingual feature
In order for billingual feature to function offline, we moved from using a third-party library to using a translation service (translation.service.ts) to replace hardcoding strings throughout the website. Currently, we only support two languages, but in the future a new language can easily be added by adding another map in the translation service file and changing the isEn variable.

## private key format
The address created by our wallet follows the ethereum web3 standard, thus our wallet is compatible with any ERC-20 wallets. The private key generated by the wallets created on our website will all be prefixed with "0x". This may not be the case with private key generated from an external wallet - for instance, the private key generated by a Metamask wallet omits the "0x" prefix. When using Import By Private Key feature, any private keys we enter that do not have "0x" as a prefix will be automatically recognized as an invalid format. This is because we use web3.js's privateKeyToAccount function which will produce two completely different result with input with and input without a prefix. If you want to import a wallet created on external website whose private key is not prefixed, just add "0x" so you can import successfully import it.

## What's the deal with password?
The password the user enters when creating a new wallet is used both as (1) The password to encrypt the private key to a keystore file, and (2) the password to authorize certain features, notably the transfer fund feature, on our platform. When importing wallet by keystore file, the user enters password used to encrypt to that particular keystore file, and that password will then automatically functions as the password for our platform features. If the user chooses to import wallet by private key, he will need to import a new password in order to encrypt that private key to create a NEW keystore file, and that password will again automatically become the password for our platform features.

## What's the deal with mnemonic?
Although we ask users to take down mnemonic when creating a wallet, we have not yet implemented an import by mnemonic feature in our wallet. This is due to the fact that the same mnemonic can correspond to multiple public address, while the same keystore file or the same private key can only correspond to one single public address. Therefore, it's hard to determine which wallet the user wants to import through mnemonic. The import by mnemonic feature may be added in future versions.