"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicaSocialWeb = void 0;
/**
 * Adaptador Web
 */
class ClinicaSocialWeb {
    constructor(crudService) {
        this.express = require('express');
        this.router = this.express.Router();
        this.crud = crudService;
    }
    getRouter() {
        return this.router;
    }
    getExpress() {
        return this.express;
    }
    start() {
        this.router.post('/add/:entity_type', (req, res) => {
            const data = req.body;
            const entity_type = req.params.entity_type;
            const promessa = this.crud.adicionarEntidade(data, entity_type);
            promessa.then((resposta) => {
                res.send(resposta);
            });
        });
        this.router.get('/get-all/:entity_type', (req, res) => {
            const entity_type = req.params.entity_type;
            const promessa = this.crud.retornarTodasEntidades(entity_type);
            promessa.then((entidadeusuario) => {
                res.send(entidadeusuario);
            });
        });
        this.router.get('/get-user/:entity_type/:cpf', (req, res) => {
            const cpf = req.params.cpf;
            const entity_type = req.params.entity_type;
            const promessa = this.crud.retornarEntidadeUsuario(cpf, entity_type);
            promessa.then((entidades) => {
                res.send(entidades);
            });
        });
        this.router.put('/update/:entity_type/:id', (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const entity_type = req.params.entity_type;
            const promessa = this.crud.atualizarEntidade(id, data, entity_type);
            promessa.then((resposta) => {
                res.send(resposta);
            });
        });
        this.router.delete('/delete/:entity_type/:id', (req, res) => {
            const id = req.params.id;
            const entity_type = req.params.entity_type;
            const promessa = this.crud.deletarEntidade(id, entity_type);
            promessa.then((resposta) => {
                res.send(resposta);
            });
        });
    }
}
exports.ClinicaSocialWeb = ClinicaSocialWeb;
