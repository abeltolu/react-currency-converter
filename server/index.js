/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const compression = require("compression");

const app = express();

//const routes = require('./routes');
//app.use('/', routes);

app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

// Point static path to dist
app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets', express.static('assets'));

/** Get port from environment and store in Express. */
const port = process.env.PORT || 8080;
app.set('port', port);

function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
}
  
app.use(compression({
    level: 2,               // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress, // set predicate to determine whether to compress
}));

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));