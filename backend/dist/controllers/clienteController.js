"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const Cliente_1 = require("../domain/Cliente");
const firestore = db_1.db.firestore();
/**
 * Adiciona um cliente à base de dados.
 *
 * O parâmetro request deve necessariamente conter em seu body
 * um Json que respeita o formato estipulado pela classe Cliente.
 * Caso o Json fuja dos padrões, será retornada uma mensagem
 * de erro contextualizada.
 *
 * @param req
 * @param res
 * @param next
 */
const addCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        yield firestore.collection('clientes').doc().set(data);
        res.send('Cliente adicionado com sucesso.');
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            console.log('Erro inesperado: addCliente()', error);
        }
    }
});
/**
 * Retorna todos os clientes presentes na database.
 *
 * @param req
 * @param res
 * @param next
 */
const getAllClientes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionClientes = yield firestore.collection('clientes');
        const data = yield collectionClientes.get();
        const clientes = [];
        if (data.empty) {
            res.status(404).send('Não há clientes cadastrados na database.');
        }
        else {
            data.forEach(doc => {
                const cliente = new Cliente_1.Cliente(doc.id, doc.data().nome, doc.data().cpf, doc.data().telefone, doc.data().email, doc.data().endereco);
                clientes.push(cliente);
            });
            res.send(clientes);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            console.log('Erro inesperado: getAllClientes()', error);
        }
    }
});
/**
 * Requisita à database os dados de um cliente específico.
 *
 * O request deve conter em sua rota o parâmetro id, o
 * qual é o identificador único do cliente na base de dados.
 *
 * Ex: .../api/get-cliente/id_do_cliente
 *
 * @param req
 * @param res
 * @param next
 */
const getCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idCliente = req.params.id;
        const cliente = yield firestore.collection('clientes').doc(idCliente);
        const data = yield cliente.get();
        if (!data.exists) {
            res.status(404).send('Não foi encontrado um cliente com esse ID.');
        }
        else {
            res.send(data.data());
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            console.log('Erro inesperado: getCliente()', error);
        }
    }
});
/**
 * Atualiza os dados de um cliente presente na base de dados.
 *
 * O parâmetro request deve necessariamente conter em seu body
 * um Json que respeita o formato estipulado pela classe Cliente.
 * Caso o Json fuja dos padrões, será retornada uma mensagem
 * de erro contextualizada.
 *
 * O request deve conter em sua rota o parâmetro id, o
 * qual é o identificador único do cliente na base de dados.
 *
 * Ex: .../api/update-cliente/id_do_cliente
 *
 * @param req
 * @param res
 * @param next
 */
const updateCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const cliente = yield firestore.collection('clientes').doc(id);
        yield cliente.update(data);
        res.send('Dados do cliente atualizados com sucesso.');
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            console.log('Erro inesperado: updateCliente()', error);
        }
    }
});
/**
 * Deleta um cliente presente na database.
 *
 * O request deve conter em sua rota o parâmetro id, o
 * qual é o identificador único do cliente na base de dados.
 *
 * Ex: .../api/delete-cliente/id_do_cliente
 *
 * @param req
 * @param res
 * @param next
 */
const deleteCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield firestore.collection('clientes').doc(id).delete();
        res.send('Cliente deletado com sucesso.');
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        else {
            console.log('Erro inesperado: deleteCliente()', error);
        }
    }
});
module.exports = {
    addCliente,
    getAllClientes,
    getCliente,
    updateCliente,
    deleteCliente,
};
