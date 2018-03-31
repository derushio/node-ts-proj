import * as nodeExternals from 'webpack-node-externals';
import * as sourceMapSupport from 'source-map-support';

import * as path from 'path';
import * as express from 'express';

const port = 3000;
const execPath = path.dirname(process.argv[1]);
const publicPath = path.resolve(execPath, '../public');

function initSourceMap(): void {
    if (process.env.NODE_ENV == 'development') {
        sourceMapSupport.install();
        console.log('ENV_LOG:', 'SOURCE MAP ENABLED');
    }
}

async function initServer(): Promise<void> {
    const server = express();
    server.use(express.static(publicPath));
    server.listen(port);
    console.log('ENV_LOG:', `//localhost:${port} --> ${publicPath}`);
}

async function main(): Promise<void> {
    initSourceMap();
    await initServer();
}
main();
