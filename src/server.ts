import * as express from "express"
import * as sourceMapSupport from 'source-map-support'

const server = express()
const port = 3000

// このディレクトリ以下を公開するサーバーを起動
sourceMapSupport.install()
server.use(express.static("./"))
server.listen(port, null)
