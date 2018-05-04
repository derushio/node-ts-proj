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
    clean && $(npm bin)/webpack && node dist/main.bundle.js
}

function build_typedoc() {
    typedoc --name "$1" --mode 'file' --out './document/typedoc' './src'
}

if [ -z ${2+UNDEF} ]; then
    $1
else
    $1 $2
fi
