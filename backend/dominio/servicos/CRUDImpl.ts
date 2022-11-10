import { CRUD } from "../portas/CRUD";
import { Repositorio } from "../portas/Repositorio";

/**
 * Implementa os serviços relacionados ao Crud da database.
 */
export class CRUDImpl implements CRUD {
  private repo: Repositorio

  constructor(repo: Repositorio) {
    this.repo = repo
  }

  adicionarEntidade(data: any, entity_type: string): any {
    // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
    return this.repo.addEntity(data, entity_type)
  }

  public retornarEntidadeUsuario(cpf: string, entity_type: string) {
    return this.repo.getUserEntity(cpf, entity_type)
  }

  public retornarTodasEntidades(entity_type: string) {
    return this.repo.getAllEntities(entity_type)
  }

  public atualizarEntidade(id: string, data: any, entity_type: string) {
    // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
    return this.repo.updateEntity(id, data, entity_type)
  }

  public deletarEntidade(id: string, entity_type: string) {
    return this.repo.deleteEntity(id, entity_type)
  }
}