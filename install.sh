#! /bin/bash
npm init
npm install --save express typescript source-map-support
npm install --save-dev typedoc
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
