#!/bin/bash -eu

yarn init
node ./_boilerplate/install-npm-scripts.js
yarn install

rm ./install.sh
rm -rf ./_boilerplate
