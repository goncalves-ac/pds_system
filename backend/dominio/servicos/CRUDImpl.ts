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
  public validarCategoriaDeObjeto(object_type: string): void {
    if (
      !this.entidadesUsuário.includes(object_type) &&
      !this.objetosDeValor.includes(object_type)
      ) {
        throw new Error('A categoria de objeto "' + object_type + '" não existe. Favor passar na rota um tipo válido.');
    }
  }

  public validarCamposDeObjeto(object_type: string, dataObject: any): void {
    let quantidadeDeCamposEncontrados = 0;
    Object.entries(dataObject).forEach(([chave, valor]) => {
      this.validarChave(object_type, chave)
      this.validarTipos(object_type, chave, valor)
      quantidadeDeCamposEncontrados++
    })
    this.validarQuantidadeDeCampos(object_type, quantidadeDeCamposEncontrados)
  }

  public validarChave(object_type: string, chave: string): void {
    const mensagemDeErro = 'Objeto de categoria:"' + object_type + '" não possui campo com nome:"' + chave + '"'

    if (object_type === 'clientes' && !this.camposCliente.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (object_type === 'psicologos' && !this.camposPsicologo.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (object_type === 'secretarias' && !this.camposSecretaria.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (object_type === 'consultas' && !this.camposConsulta.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
    if (object_type === 'prontuarios' && !this.camposProntuario.includes(chave)) {
      throw new Error(mensagemDeErro);
    }
  }

  public validarTipos(object_type: string, chave:string, valor: any): void {
    if (chave === 'endereco') {
      if (!(typeof valor === 'object')) {
        throw new Error('Objeto:"' + object_type + '" deve ter campo:"' + chave + '" como tipo object e não "' + typeof valor + '"');
      }
      // Todo: Endereços são objetos. Logo faz sentido checar também os tipos de seus valores internos.
      return
    }
    if (!(typeof valor === 'string')) {
      throw new Error('Objeto:"' + object_type + '" deve ter campo:"' + chave + '" como tipo string e não "' + typeof valor + '"');
    }
  }

  public validarQuantidadeDeCampos(object_type:string, quantidadeDeCamposEncontrados: number): void {
    let qtdCampos = this.camposCliente.length
    let msgErro = 'Objeto:"' + object_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCamposEncontrados + ' )';
    if (object_type === 'clientes' && quantidadeDeCamposEncontrados !== qtdCampos) {
      throw new Error(msgErro);
    }
    qtdCampos = this.camposPsicologo.length
    msgErro = 'Objeto:"' + object_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCamposEncontrados + ' )';
    if (object_type === 'psicologos' && quantidadeDeCamposEncontrados !== qtdCampos) {
      throw new Error(msgErro);
    }
    qtdCampos = this.camposSecretaria.length
    msgErro = 'Objeto:"' + object_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCamposEncontrados + ' )';
    if (object_type === 'secretarias' && quantidadeDeCamposEncontrados !== qtdCampos) {
      throw new Error(msgErro);
    }
    qtdCampos = this.camposConsulta.length
    msgErro = 'Objeto:"' + object_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCamposEncontrados + ' )';
    if (object_type === 'consultas' && quantidadeDeCamposEncontrados !== qtdCampos) {
      throw new Error(msgErro);
    }
    qtdCampos = this.camposProntuario.length
    msgErro = 'Objeto:"' + object_type + '" deve ter ( ' + qtdCampos + ' ) campos ao invés de ( ' + quantidadeDeCamposEncontrados + ' )';
    if (object_type === 'prontuarios' && quantidadeDeCamposEncontrados !== qtdCampos) {
      throw new Error(msgErro);
    }
  }

  /**
   * Funções delimitadas pela interface.
   */
  public adicionarObjeto(data: any, object_type: string): any {
    try {
      this.validarCategoriaDeObjeto(object_type)
      this.validarCamposDeObjeto(object_type, data)
      return this.repo.addObject(data, object_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public retornarEntidadeUsuario(cpf: string, entity_type: string) {
    try {
      this.validarCategoriaDeObjeto(entity_type)
      return this.repo.getUserEntity(cpf, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public retornarTodosObjetos(entity_type: string) {
    try {
      this.validarCategoriaDeObjeto(entity_type)
      return this.repo.getAllObjects(entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public atualizarObjeto(id: string, data: any, entity_type: string) {
    try {
      this.validarCategoriaDeObjeto(entity_type)
      this.validarCamposDeObjeto(entity_type, data)
      return this.repo.updateObject(id, data, entity_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }

  public deletarObjeto(id: string, object_type: string) {
    try {
      this.validarCategoriaDeObjeto(object_type)
      return this.repo.deleteObject(id, object_type)
    } catch (error) {
      return this.tratarErro(error)
    }
  }
}