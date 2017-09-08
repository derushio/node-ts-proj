#! /bin/bash
npm init

npm install --save express typescript tsc typedoc
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
