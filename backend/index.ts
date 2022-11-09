import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ClinicaSocialWeb } from './adaptadores/ClinicaSocialWeb';
import { PesquisaClienteImpl } from './dominio/servicos/PesquisaClienteImpl'
import { RepositorioClienteImpl } from './adaptadores/RepositorioClienteImpl';

dotenv.config();

const port = process.env.PORT;
const cors = require('cors')
const bodyParser = require('body-parser');

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

const repo = new RepositorioClienteImpl()
const pesq = new PesquisaClienteImpl(repo)
const clinicaSocialWeb = new ClinicaSocialWeb(pesq)
clinicaSocialWeb.start()

app.use('/api', clinicaSocialWeb.getRouter())

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});