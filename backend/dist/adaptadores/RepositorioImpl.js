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
exports.RepositorioImpl = void 0;
const db_1 = require("../db");
const Cliente_1 = require("../dominio/entidades/Cliente");
const Secretaria_1 = require("../dominio/entidades/Secretaria");
const Psicologo_1 = require("../dominio/entidades/Psicologo");
const Prontuario_1 = require("../dominio/entidades/Prontuario");
const firestore = db_1.db.firestore();
/**
 * Adaptador para o Banco de Dados
 */
class RepositorioImpl {
    constructor() {
        /**
         * Adiciona um cliente à base de dados.
         *
         * @param data Dados em formato json
         * @param entity_type String que representa o tipo de entidade a ser adicionada.
         */
        this.addEntity = (data, entity_type) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield firestore.collection(entity_type).doc().set(data);
                return 'Entidade do tipo:"' + entity_type + '" adicionada com sucesso.';
            }
            catch (error) {
                console.log('Erro inesperado: addEntity()');
                return 'Erro inesperado: addEntity()';
            }
        });
        /**
         * Retorna todos os clientes presentes na database.
         *
         * @param entity_type String que representa o tipo de entidade a ser recuperada.
         */
        this.getAllEntities = (entity_type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield firestore.collection(entity_type);
                const data = yield collection.get();
                const entities = [];
                if (entity_type === 'clientes') {
                    data.forEach(doc => {
                        const cliente = new Cliente_1.Cliente(doc.id, doc.data().nome, doc.data().cpf, doc.data().telefone, doc.data().email, doc.data().endereco);
                        entities.push(cliente);
                    });
                }
                else if (entity_type === 'secretarias') {
                    data.forEach(doc => {
                        const secretaria = new Secretaria_1.Secretaria(doc.id, doc.data().nome, doc.data().cpf, doc.data().telefone, doc.data().email, doc.data().endereco, doc.data().worDays, doc.data().workHours);
                        entities.push(secretaria);
                    });
                }
                else if (entity_type === 'psicologos') {
                    data.forEach(doc => {
                        const psicologo = new Psicologo_1.Psicologo(doc.id, doc.data().nome, doc.data().cpf, doc.data().telefone, doc.data().email, doc.data().endereco, doc.data().crp, doc.data().workDays, doc.data().especialidade);
                        entities.push(psicologo);
                    });
                }
                else if (entity_type === 'prontuarios') {
                    data.forEach(doc => {
                        const prontuario = new Prontuario_1.Prontuario(doc.data().date, doc.data().time, doc.data().parecer);
                        entities.push(prontuario);
                    });
                }
                return entities;
            }
            catch (error) {
                console.log('Erro inesperado: getAllEntities()');
            }
        });
        /**
         * Requisita à database os dados de uma entidade usuário específica.
         *
         * @param cpf String que representa o cpf de um usuário, seu identificador único.
         * @param entity_type String que representa o tipo de entidade a ser recuperada.
         */
        this.getUserEntity = (cpf, entity_type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entityRef = yield firestore.collection(entity_type);
                const snapshot = yield entityRef.where('cpf', '==', cpf).get();
                if (snapshot.empty) {
                    console.log('Não foi encontrado uma entidade do tipo:"' + entity_type + '" com esse CPF.');
                }
                else {
                    let docData = [];
                    // Bug: Se houver mais de um usuário com o mesmo CPF, apenas o último usuário da coleção será retornado.
                    snapshot.forEach((doc) => {
                        docData = doc.data();
                    });
                    if (entity_type === 'clientes') {
                        const cliente = new Cliente_1.Cliente(docData.id, docData.nome, docData.cpf, docData.telefone, docData.email, docData.endereco);
                        return cliente;
                    }
                    if (entity_type === 'secretarias') {
                        const secretaria = new Secretaria_1.Secretaria(docData.id, docData.nome, docData.cpf, docData.telefone, docData.email, docData.endereco, docData.worDays, docData.workHours);
                        return secretaria;
                    }
                    if (entity_type === 'psicologos') {
                        const psicologo = new Psicologo_1.Psicologo(docData.id, docData.nome, docData.cpf, docData.telefone, docData.email, docData.endereco, docData.crp, docData.workDays, docData.especialidade);
                        return psicologo;
                    }
                }
            }
            catch (error) {
                console.log('Erro inesperado: getUserEntity()');
            }
        });
        /**
         * Atualiza os dados de um entidade presente na base de dados.
         *
         * @param id String que representa o identifacor único da entidade no banco de dados.
         * @param data Dados em formato json.
         * @param entity_type String que representa o tipo de entidade a ser atualizada.
         */
        this.updateEntity = (id, data, entity_type) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield firestore.collection(entity_type).doc(id);
                yield cliente.update(data);
                return 'Entidade do tipo:"' + entity_type + '" atualizada com sucesso.';
            }
            catch (error) {
                console.log('Erro inesperado: updateEntity()');
                return 'Erro inesperado: updateEntity()';
            }
        });
        /**
         * Deleta uma entidade presente na database.
         *
         * @param id String que representa o identifacor único da entidade no banco de dados.
         * @param entity_type String que representa o tipo de entidade a ser deletada.
         */
        this.deleteEntity = (id, entity_type) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield firestore.collection(entity_type).doc(id).delete();
                return 'Entidade do tipo:"' + entity_type + '" deletada com sucesso.';
            }
            catch (error) {
                console.log('Erro inesperado: deleteEntity()');
                return 'Erro inesperado: deleteEntity()';
            }
        });
    }
}
exports.RepositorioImpl = RepositorioImpl;
