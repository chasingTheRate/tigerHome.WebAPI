const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const routes = require(`./${ config.version }/routes`);
const port = config.port;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/blinds', routes.blindRoutes);
app.use('/', routes.catchAllRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`))