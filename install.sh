#! /bin/bash
cd src/
npm init
npm install --save express typescript source-map-support
npm install --save-dev typedoc
node ../install-npm-script.js

cd ../
rm ./install.sh
rm ./install-npm-script.js
