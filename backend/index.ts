import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const cors = require('cors')
const bodyParser = require('body-parser');
const clienteRoutes = require('./adaptadores/rotas/clienteRoutes');

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

app.use('/api', clienteRoutes.routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});