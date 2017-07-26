#! /bin/bash
npm init

npm install --save babel-cli babel-preset-es2015 express tsc
node ./install-npm-script.js

rm ./install.sh
rm ./install-npm-script.js
