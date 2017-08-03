export declare function require(name: string): any
const express = require('express')
const server = express()

const port = 3000

// このディレクトリ以下を公開するサーバーを起動
server.use(express.static("./"))
server.listen(port, null)
