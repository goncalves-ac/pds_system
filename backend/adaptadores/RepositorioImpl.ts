import { db } from '../db'
import { Cliente } from '../dominio/entidades/Cliente'
import { Secretaria } from '../dominio/entidades/Secretaria'
import { Psicologo } from '../dominio/entidades/Psicologo'
import { Prontuario } from '../dominio/entidades/Prontuario'
import { Repositorio } from '../dominio/portas/Repositorio'

const firestore = db.firestore()

/**
 * Adaptador para o Banco de Dados
 */
export class RepositorioImpl implements Repositorio {
  private res: any

  constructor(res: any = null) {
    this.res = res
  }

  /**
   * Adiciona um cliente à base de dados.
   *
   * O parâmetro data deve necessariamente ser um Json
   * que respeita o formato estipulado pela classe Cliente.
   * Caso o Json fuja dos padrões, será retornada uma mensagem
   * de erro contextualizada.
   *
   * @param data
   */
  public addEntity = async (data: any, entity_type: string) => {
    try {
      await firestore.collection(entity_type).doc().set(data)
      this.res.send('Entidade do tipo:"' + entity_type + '" adicionada com sucesso.')

    } catch (error) {
      this.handleError(error, 'Erro inesperado: addCliente()')
    }
  }

  /**
   * Retorna todos os clientes presentes na database.
   */
  public getAllEntities = async (entity_type: string) => {
    try {
      const collection = await firestore.collection(entity_type)
      const data = await collection.get()
      const entities: any[] = []

      if (data.empty) {
        this.responseStatus('Não há entidades do tipo:"' + entity_type + '" cadastradas na database.')
      } else {
        if (entity_type === 'clientes') {
          data.forEach(doc => {
            const cliente = new Cliente(
              doc.id,
              doc.data().nome,
              doc.data().cpf,
              doc.data().telefone,
              doc.data().email,
              doc.data().endereco
            )
            entities.push(cliente)
          })
        } else if (entity_type === 'secretarias') {
          data.forEach(doc => {
            const secretaria = new Secretaria(
              doc.id,
              doc.data().nome,
              doc.data().cpf,
              doc.data().telefone,
              doc.data().email,
              doc.data().endereco,
              doc.data().worDays,
              doc.data().workHours
            )
            entities.push(secretaria)
          })
        } else if (entity_type === 'psicologos') {
          data.forEach(doc => {
            const psicologo = new Psicologo(
              doc.id,
              doc.data().nome,
              doc.data().cpf,
              doc.data().telefone,
              doc.data().email,
              doc.data().endereco,
              doc.data().crp,
              doc.data().workDays,
              doc.data().especialidade
            )
            entities.push(psicologo)
          })
        } else if (entity_type === 'prontuarios') {
          data.forEach(doc => {
            const prontuario = new Prontuario(
              doc.data().date,
              doc.data().time,
              doc.data().parecer,
            )
            entities.push(prontuario)
          })
        }

        this.sendResponseObject(entities)
        return entities
      }

    } catch (error) {
      this.handleError(error, 'Erro inesperado: getAllEntities()')
    }
  }

  /**
   * Requisita à database os dados de um cliente específico.
   *
   * O request deve conter em sua rota o parâmetro id, o
   * qual é o identificador único do cliente na base de dados.
   *
   * Ex: .../api/get-cliente/id_do_cliente
   *
   * @param cpf
   * @param entity_type
   */
  public getUserEntity = async (cpf: string, entity_type: string) => {
    try {
      const entityRef = await firestore.collection(entity_type)
      const snapshot = await entityRef.where('cpf', '==', cpf).get()
      if (snapshot.empty) {
        this.responseStatus('Não foi encontrado uma entidade do tipo:"' + entity_type + '" com esse CPF.')
      } else {
        let docData: any = []

        // Bug: Se houver mais de um usuário com o mesmo CPF, apenas o último usuário da coleção será retornado.
        snapshot.forEach((doc: { data: () => any }) => {
          docData = doc.data()
        });

        if (entity_type === 'clientes') {
          const cliente = new Cliente(
            docData.id,
            docData.nome,
            docData.cpf,
            docData.telefone,
            docData.email,
            docData.endereco
          )
          this.sendResponseObject(cliente)
          return cliente
        }
        if (entity_type === 'secretarias') {
          const secretaria = new Secretaria(
            docData.id,
            docData.nome,
            docData.cpf,
            docData.telefone,
            docData.email,
            docData.endereco,
            docData.worDays,
            docData.workHours
          )
          this.sendResponseObject(secretaria)
          return secretaria
        }
        if (entity_type === 'psicologos') {
          const psicologo = new Psicologo(
            docData.id,
            docData.nome,
            docData.cpf,
            docData.telefone,
            docData.email,
            docData.endereco,
            docData.crp,
            docData.workDays,
            docData.especialidade
          )
          this.sendResponseObject(psicologo)
          return psicologo
        }
      }
    }
    catch (error) {
      this.handleError(error, 'Erro inesperado: getUserEntity()')
    }
  }

  /**
   * Atualiza os dados de um cliente presente na base de dados.
   *
   * O parâmetro data deve necessariamente ser um Json
   * que respeita o formato estipulado pela classe Cliente.
   * Caso o Json fuja dos padrões, será retornada uma mensagem
   * de erro contextualizada.
   *
   * O request deve conter em sua rota o parâmetro id, o
   * qual é o identificador único do cliente na base de dados.
   *
   * Ex: .../api/update-cliente/id_do_cliente
   *
   * @param id
   * @param data
   */
  public updateEntity = async (id: any, data: any, entity_type: string) => {
    try {
      const cliente = await firestore.collection(entity_type).doc(id);
      await cliente.update(data);
      this.res.send('Entidade do tipo:"' + entity_type + '"atualizada com sucesso.');
    } catch (error) {
      this.handleError(error, 'Erro inesperado: updateEntity()')
    }
  }

  /**
   * Deleta um cliente presente na database.
   *
   * O request deve conter em sua rota o parâmetro id, o
   * qual é o identificador único do cliente na base de dados.
   *
   * Ex: .../api/delete-cliente/id_do_cliente
   *
   * @param id
   */
  public deleteEntity = async (id: any, entity_type: string) => {
    try {
      await firestore.collection(entity_type).doc(id).delete();
      this.res.send('Entidade do tipo:"' + entity_type + '"deletada com sucesso.');
    } catch (error) {
      this.handleError(error, 'Erro inesperado: deleteEntity()')
    }
  }

  private handleError(error: any, unexpected_error_message: string) {
    if (error instanceof Error) {
      this.res.status(400).send(error.message)
      return
    }
    console.log(unexpected_error_message, error)
  }

  private responseStatus(relevant_message: string) {
    if (this.res !== null) {
      this.res.status(404).send(relevant_message)
      return
    }
    console.log(relevant_message)
  }

  private sendResponseObject(responseObject: any) {
    if (this.res !== null) {
      this.res.send(responseObject)
    }
  }
}
