import * as nodeExternals from 'webpack-node-externals';
import * as sourceMapSupport from 'source-map-support';
import * as express from 'express';

const server = express();
const port = 3000;

// このディレクトリ以下を公開するサーバーを起動
sourceMapSupport.install();
server.use(express.static("./"));
server.listen(port);
