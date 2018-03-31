#!/bin/bash -eu

function clean() {
    $(npm bin)/rimraf './dist/*'
}

function build() {
    export NODE_ENV='production'
    clean && $(npm bin)/webpack
}

function dev() {
    export NODE_ENV='development'
    clean && $(npm bin)/webpack && node dist/main.js
}

if [ -z ${2+UNDEF} ]; then
    $1
else
    $1 $2
fi
