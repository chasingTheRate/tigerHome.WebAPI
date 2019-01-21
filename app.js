require('dotenv').config()
const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');

const routesV1 = require(`./v1/routes`);
const port = config.port;

const app = express();
const baseUrl = '/api'

app.use(bodyParser.json());
app.use(cors());
app.use(`${baseUrl}/v1/blinds`, routesV1.blindRoutes);
app.use(`${baseUrl}/v1/`, routesV1.catchAllRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`))