#!/bin/bash

SUCCESS=0
FAIL=1

PROJ_NAME="proj"
SRC_DIR="./src"
DIST_DIR="./dist"

function clean() {
    [ ! -e "$DIST_DIR" ] && mkdir "$DIST_DIR"
    find "$DIST_DIR" -maxdepth 1 -print | \
        grep -E "$DIST_DIR/.+" | \
        xargs -I{} rm -rf {}
}

function build() {
    tsc -p "." --outDir "$DIST_DIR" --sourcemap
}

function test_build() {
    build

    cp "package.json" "$DIST_DIR"
}

###
# node-gypなどを使わず、node_modulesが共用でかまわない
# 場合はこちらをお使いください
###
function test_build_sync_node_modules() {
    test_build
    rsync -a "./node_modules/" "${DIST_DIR}/node_modules/"
}

function clean_build() {
    clean
    build

    cp "package.json" "$DIST_DIR"
}

###
# node-gypなどを使わず、node_modulesが共用でかまわない
# 場合はこちらをお使いください
###
function clean_build_sync_node_modules() {
    clean_build
    rsync -a "./node_modules/" "${DIST_DIR}/node_modules/"
}

function build_typedoc {
    typedoc --name "$PROJ_NAME" --mode "modules" --out "./document/typedoc" "$SRC_DIR"
}

$1
exit "$SUCCESS"
