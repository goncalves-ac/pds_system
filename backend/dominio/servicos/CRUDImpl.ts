import { CRUD } from "../portas/CRUD";
import { Repositorio } from "../portas/Repositorio";

/**
 * Implementa os serviços relacionados ao Crud da database.
 */
export class CRUDImpl implements CRUD {
  private repo: Repositorio
  private entidadesUsuário: string[]
  private entidadesOrganizacionais: string[]
  private camposCliente: string[]
  private camposPsicologo: string[]
  private camposSecretaria: string[]
  private camposConsulta: string[]
  private camposProntuario: string[]

  // Todo: refatorar as declarações de campos e entidades para validação
  constructor(repo: Repositorio) {
    this.repo = repo
    // Declaração dos nomes válidos para cada coleção de documento/tipos de entidade
    this.entidadesUsuário = ['clientes', 'psicologos', 'secretarias']
    this.entidadesOrganizacionais = ['consultas', 'prontuarios']
    // Declaração dos campos válidos para cada tipo de entidade
    this.camposCliente = ['id', 'nome', 'cpf', 'telefone', 'email', 'endereco']
    this.camposPsicologo = ['id', 'nome', 'cpf', 'telefone', 'email', 'endereco', 'crp', 'workDays', 'especialidade']
    this.camposSecretaria = ['id', 'nome', 'cpf', 'telefone', 'email', 'endereco', 'workDays', 'workHours']
    this.camposConsulta = ['id', 'nomeCliente', 'nomePsicologo', 'dia', 'mes', 'ano', 'hora']
    this.camposProntuario = ['id', 'nomeCliente', 'nomePsicologo', 'dia', 'mes', 'ano', 'parecer']
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

  /**
   * Funções para validação dos dados presentes nas rotas e requests.
   */
  private validarTipoDeEntidade(entity_type: string): void {
    if (
      !this.entidadesUsuário.includes(entity_type) &&
      !this.entidadesOrganizacionais.includes(entity_type)
      ) {
        throw new Error('O tipo de entidade "' + entity_type + '" não existe. Favor passar na rota um tipo válido.');
    }
  }
  private validarCamposDeEntidade(entity_type: string, dataObject: any): void {
    Object.entries(dataObject).forEach(([chave, valor]) => {
      this.validarChave(entity_type, chave)
      this.validarTipos(entity_type, chave, valor)
    })
  }
  private validarChave(entity_type: string, chave: string): void {
    const mensagemDeErro = 'Entidade do tipo:"' + entity_type + '" não possui campo com nome:"' + chave + '"'

    if (entity_type === 'clientes' && !this.camposCliente.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (entity_type === 'psicologos' && !this.camposPsicologo.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (entity_type === 'secretarias' && !this.camposSecretaria.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (entity_type === 'consultas' && !this.camposConsulta.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (entity_type === 'prontuarios' && !this.camposProntuario.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
  }
  private validarTipos(entity_type: string, chave:string, valor: any): void {
    if (chave === 'endereco') {
      if (!(typeof valor === 'object')) {
        throw new Error('Entidade:"' + entity_type + '" deve ter campo:"' + chave + '" como tipo object e não "' + typeof valor + '"');
      }
      // Todo: Endereços são objetos. Logo faz sentido checar também os tipos de seus valores internos.
      return
    }
    if (!(typeof valor === 'string')) {
      throw new Error('Entidade:"' + entity_type + '" deve ter campo:"' + chave + '" como tipo string e não "' + typeof valor + '"');
    }
  }

  /**
   * Funções delimitadas pela interface.
   */
  public adicionarEntidade(data: any, entity_type: string): any {
    try {
      this.validarTipoDeEntidade(entity_type)
      this.validarCamposDeEntidade(entity_type, data)
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
      this.validarCamposDeEntidade(entity_type, data)
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