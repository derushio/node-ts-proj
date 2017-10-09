const fs = require('fs')

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

json["scripts"] = {}
json["scripts"]["build"] = "tsc -p src --outDir dist;cp package.json dist; rsync -a node_modules dist/"
json["scripts"]["run"] = "npm run build && node ./dist/server.js"
json["scripts"]["clean"] = "dir=./dist; [ ! -e $dir ] && mkdir $dir; find ./dist -maxdepth 1 -print | grep -E \"./dist/.+\" | xargs -I{} rm -rf {}"
json["scripts"]["clean-build"] = "npm run clean; tsc -p src --outDir dist;cp package.json dist; cd dist; npm install"
json["scripts"]["build-typedoc"] = "cd ./src; typedoc --name 'doc-server' --mode 'file' --out '../document/typedoc' './'"

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));
