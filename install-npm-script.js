const fs = require('fs')

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

json["scripts"] = {}
json["scripts"]["build"] = "tsc -p src --outDir dist-es6; babel dist-es6 -d dist; rm -rf dist-es6;cp package.json dist; rsync -a node_modules dist/"
json["scripts"]["clean"] = "mkdir ./dist; find ./dist -maxdepth 1 -print | grep -E \"./dist/.+\" | xargs -I{} rm -rf {}"
json["scripts"]["clean-build"] = "npm run clean; tsc -p src --outDir dist-es6; babel dist-es6 -d dist; rm -rf dist-es6;cp package.json dist; cd dist; npm install"

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));
