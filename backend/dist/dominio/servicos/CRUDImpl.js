"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDImpl = void 0;
/**
 * Implementa os serviços relacionados ao Crud da database.
 */
class CRUDImpl {
    constructor(repo) {
        this.repo = repo;
    }
    adicionarEntidade(data, entity_type) {
        // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
        return this.repo.addEntity(data, entity_type);
    }
    retornarEntidadeUsuario(cpf, entity_type) {
        return this.repo.getUserEntity(cpf, entity_type);
    }
    retornarTodasEntidades(entity_type) {
        return this.repo.getAllEntities(entity_type);
    }
    atualizarEntidade(id, data, entity_type) {
        // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
        return this.repo.updateEntity(id, data, entity_type);
    }
    deletarEntidade(id, entity_type) {
        return this.repo.deleteEntity(id, entity_type);
    }
}
exports.CRUDImpl = CRUDImpl;
