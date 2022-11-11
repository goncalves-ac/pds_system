"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ClinicaSocialWeb_1 = require("./adaptadores/ClinicaSocialWeb");
const RepositorioImpl_1 = require("./adaptadores/RepositorioImpl");
const CRUDImpl_1 = require("./dominio/servicos/CRUDImpl");
dotenv_1.default.config();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(cors());
app.use(bodyParser.json());
const repo = new RepositorioImpl_1.RepositorioImpl();
const crud = new CRUDImpl_1.CRUDImpl(repo);
const clinicaSocialWeb = new ClinicaSocialWeb_1.ClinicaSocialWeb(crud);
clinicaSocialWeb.start();
app.use('/api', clinicaSocialWeb.getRouter());
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
