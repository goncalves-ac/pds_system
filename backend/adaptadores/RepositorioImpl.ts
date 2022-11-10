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
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: addCliente()', error)
      }
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
        this.res.status(404).send('Não há entidades do tipo:"' + entity_type + '" cadastradas na database.')
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
              doc.id,
              doc.data().nome,
              doc.data().cpf,
            )
            entities.push(prontuario)
          })
        }

        this.res.send(entities)
        return entities
      }

    } catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: getAllEntities()', error)
      }
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
   * @param id
   */
  public getEntity = async (id: any, entity_type: string) => {
    try {
      const entity = await firestore.collection(entity_type).doc(id)
      const doc = await entity.get()

      if (!doc.exists) {
        this.res.status(404).send('Não foi encontrado uma entidade do tipo:"' + entity_type + 'com esse ID.')
      } else {
        // this.res.send(data.data())
        if (entity_type === 'clientes') {
          const cliente = new Cliente(
            doc.id,
            doc.data().nome,
            doc.data().cpf,
            doc.data().telefone,
            doc.data().email,
            doc.data().endereco
          )
          this.res.send(cliente)
          return cliente
        }
        if (entity_type === 'secretarias') {
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
          this.res.send(secretaria)
          return secretaria
        }
        if (entity_type === 'psicologos') {
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
          this.res.send(psicologo)
          return psicologo
        }
        if (entity_type === 'prontuarios') {
          const prontuario = new Prontuario(
            doc.id,
            doc.data().nome,
            doc.data().cpf,
          )
          this.res.send(prontuario)
          return prontuario
        }
      }
    }
    catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: getEntity()', error)
      }
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
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: updateEntity()', error)
      }
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
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: deleteEntity()', error)
      }
    }
  }
}
