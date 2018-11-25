const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const routes = require(`./${ config.version }/routes`);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/blinds', routes.blindRoutes);
app.use('/', routes.catchAllRoutes);

const server = require('http').Server(app);
const io = require('socket.io')(server);

const sockets = require(`./${ config.version }/sockets`)(io);

console.log(`App listening on port: ${ config.port }`);
server.listen(config.port);