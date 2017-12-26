const fs = require('fs')

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

json["scripts"] = {}
json["scripts"]["build"] = "./scripts.sh build_sync_node_modules"
json["scripts"]["clean"] = "./scripts.sh clean"
json["scripts"]["build_typedoc"] = "./scripts.sh build_typedoc"

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));
