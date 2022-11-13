import { CRUD } from "../portas/CRUD";
import { Repositorio } from "../portas/Repositorio";

/**
 * Implementa os serviços relacionados ao Crud da database.
 */
export class CRUDImpl implements CRUD {
  private repo: Repositorio
  private entidadesUsuário: string[]
  private objetosDeValor: string[]
  private camposCliente: string[]
  private camposPsicologo: string[]
  private camposSecretaria: string[]
  private camposConsulta: string[]
  private camposProntuario: string[]

  // Todo: refatorar as declarações de campos e entidades para validação
  constructor(repo: Repositorio) {
    this.repo = repo
    // Declaração dos nomes válidos para cada coleção de documento/tipos de entidade ou objeto
    this.entidadesUsuário = ['clientes', 'psicologos', 'secretarias']
    this.objetosDeValor = ['consultas', 'prontuarios']
    // Declaração dos campos válidos para cada tipo de entidade ou objeto
    this.camposCliente = ['nome', 'cpf', 'telefone', 'email', 'endereco']
    this.camposPsicologo = ['nome', 'cpf', 'telefone', 'email', 'endereco', 'crp', 'workDays', 'especialidade']
    this.camposSecretaria = ['nome', 'cpf', 'telefone', 'email', 'endereco', 'workDays', 'workHours']
    this.camposConsulta = ['nomeCliente', 'nomePsicologo', 'dia', 'mes', 'ano', 'hora']
    this.camposProntuario = ['nomeCliente', 'nomePsicologo', 'dia', 'mes', 'ano', 'parecer']
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
      !this.objetosDeValor.includes(entity_type)
      ) {
        throw new Error('O tipo de entidade "' + entity_type + '" não existe. Favor passar na rota um tipo válido.');
    }
  }
  private validarCamposDeEntidade(entity_type: string, dataObject: any): void {
    let quantidadeDeCampos = 0;
    Object.entries(dataObject).forEach(([chave, valor]) => {
      this.validarChave(entity_type, chave)
      this.validarTipos(entity_type, chave, valor)
      quantidadeDeCampos++
    })
    this.validarQuantidadeDeCampos(entity_type, quantidadeDeCampos)
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
  // Todo: refatorar if statements, colocando-os numa única função.
  private validarQuantidadeDeCampos(entity_type:string, quantidadeDeCampos: number) {
    let qtdCampos = this.camposCliente.length
    if (entity_type === 'clientes' && quantidadeDeCampos !== qtdCampos) {
      throw new Error(
        'Entidade:"' + entity_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCampos + ' )'
      );
    }
    qtdCampos = this.camposPsicologo.length
    if (entity_type === 'psicologos' && quantidadeDeCampos !== qtdCampos) {
      throw new Error(
        'Entidade:"' + entity_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCampos + ' )'
      );
    }
    qtdCampos = this.camposSecretaria.length
    if (entity_type === 'secretarias' && quantidadeDeCampos !== qtdCampos) {
      throw new Error(
        'Entidade:"' + entity_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCampos + ' )'
      );
    }
    qtdCampos = this.camposConsulta.length
    if (entity_type === 'consultas' && quantidadeDeCampos !== qtdCampos) {
      throw new Error(
        'Entidade:"' + entity_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCampos + ' )'
      );
    }
    qtdCampos = this.camposProntuario.length
    if (entity_type === 'prontuarios' && quantidadeDeCampos !== qtdCampos) {
      throw new Error(
        'Entidade:"' + entity_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCampos + ' )'
      );
    }
  }

  /**
   * Funções delimitadas pela interface.
   */
  public adicionarObjeto(data: any, entity_type: string): any {
    try {
      this.validarTipoDeEntidade(entity_type)
      this.validarCamposDeEntidade(entity_type, data)
      return this.repo.addObject(data, entity_type)
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

  public retornarTodosObjetos(entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      return this.repo.getAllObjects(entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public atualizarObjeto(id: string, data: any, entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      this.validarCamposDeEntidade(entity_type, data)
      return this.repo.updateObject(id, data, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public deletarObjeto(id: string, entity_type: string) {
    try {
      this.validarTipoDeEntidade(entity_type)
      return this.repo.deleteObject(id, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }
}