import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ClinicaSocialWeb } from './adaptadores/ClinicaSocialWeb';
import { RepositorioImpl } from './adaptadores/RepositorioImpl';
import { CRUDImpl } from './dominio/servicos/CRUDImpl';

dotenv.config();

const port = process.env.PORT;
const cors = require('cors')
const bodyParser = require('body-parser');

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const clinicaSocialWeb = new ClinicaSocialWeb(crud)
clinicaSocialWeb.start()

app.use('/api', clinicaSocialWeb.getRouter())

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});