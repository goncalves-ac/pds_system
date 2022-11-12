import { CRUD } from "../portas/CRUD";
import { Repositorio } from "../portas/Repositorio";

/**
 * Implementa os serviços relacionados ao Crud da database.
 */
export class CRUDImpl implements CRUD {
  private repo: Repositorio
  private entidadesUsuário: string[]
  private entidadesOrganizacionais: string[]

  constructor(repo: Repositorio) {
    this.repo = repo
    this.entidadesUsuário = ['clientes', 'psicologos', 'secretarias']
    this.entidadesOrganizacionais = ['consultas', 'prontuarios']
  }

  /**
   * Funções auxiliares próprias à classe.
   */
  private getMensagemDeErro(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

  private tratarErro(error: unknown): string {
    const msgErro = this.getMensagemDeErro(error)
    console.log(this.getMensagemDeErro(error))
    return msgErro
  }

  private validarTipoDeEntidade(entity_type: string): void {
    if (
      !this.entidadesUsuário.includes(entity_type) &&
      !this.entidadesOrganizacionais.includes(entity_type)
      ) {
        throw new Error('O tipo de entidade "' + entity_type + '" não existe. Favor passar na rota um tipo válido.');
    }
  }

  /**
   * Funções delimitadas pela interface.
   */
  public adicionarEntidade(data: any, entity_type: string): any {
    try {
      this.validarTipoDeEntidade(entity_type)
      // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
      return this.repo.addEntity(data, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public retornarEntidadeUsuario(cpf: string, entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      return this.repo.getUserEntity(cpf, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public retornarTodasEntidades(entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      return this.repo.getAllEntities(entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public atualizarEntidade(id: string, data: any, entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      // Todo: método que verifica estrutura dos dados, vendo se respeita a classe domínio correspondente
      return this.repo.updateEntity(id, data, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public deletarEntidade(id: string, entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      return this.repo.deleteEntity(id, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }
}