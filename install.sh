#! /bin/bash
npm init

npm install --save express typescript typedoc source-map-support
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
