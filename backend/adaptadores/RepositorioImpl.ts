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
  /**
   * Adiciona um cliente à base de dados.
   *
   * @param data Dados em formato json
   * @param entity_type String que representa o tipo de entidade a ser adicionada.
   */
  public addEntity = async (data: any, entity_type: string) => {
    try {
      await firestore.collection(entity_type).doc().set(data)
      return 'Entidade do tipo:"' + entity_type + '" adicionada com sucesso.'
    } catch (error) {
      console.log('Erro inesperado: addEntity()')
      return 'Erro inesperado: addEntity()'
    }
  }

  /**
   * Retorna todos os clientes presentes na database.
   *
   * @param entity_type String que representa o tipo de entidade a ser recuperada.
   */
  public getAllEntities = async (entity_type: string) => {
    try {
      const collection = await firestore.collection(entity_type)
      const data = await collection.get()
      const entities: any[] = []

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
      return entities
    } catch (error) {
      console.log('Erro inesperado: getAllEntities()')
    }
  }

  /**
   * Requisita à database os dados de uma entidade usuário específica.
   *
   * @param cpf String que representa o cpf de um usuário, seu identificador único.
   * @param entity_type String que representa o tipo de entidade a ser recuperada.
   */
  public getUserEntity = async (cpf: string, entity_type: string) => {
    try {
      const entityRef = await firestore.collection(entity_type)
      const snapshot = await entityRef.where('cpf', '==', cpf).get()
      if (snapshot.empty) {
        console.log('Não foi encontrado uma entidade do tipo:"' + entity_type + '" com esse CPF.')
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
          return psicologo
        }
      }
    }
    catch (error) {
      console.log('Erro inesperado: getUserEntity()')
    }
  }

  /**
   * Atualiza os dados de um entidade presente na base de dados.
   *
   * @param id String que representa o identifacor único da entidade no banco de dados.
   * @param data Dados em formato json.
   * @param entity_type String que representa o tipo de entidade a ser atualizada.
   */
  public updateEntity = async (id: any, data: any, entity_type: string) => {
    try {
      const cliente = await firestore.collection(entity_type).doc(id);
      await cliente.update(data);
      return 'Entidade do tipo:"' + entity_type + '" atualizada com sucesso.'
    } catch (error) {
      console.log('Erro inesperado: updateEntity()')
      return 'Erro inesperado: updateEntity()'
    }
  }

  /**
   * Deleta uma entidade presente na database.
   *
   * @param id String que representa o identifacor único da entidade no banco de dados.
   * @param entity_type String que representa o tipo de entidade a ser deletada.
   */
  public deleteEntity = async (id: any, entity_type: string) => {
    try {
      await firestore.collection(entity_type).doc(id).delete();
      return 'Entidade do tipo:"' + entity_type + '" deletada com sucesso.'
    } catch (error) {
      console.log('Erro inesperado: deleteEntity()')
      return 'Erro inesperado: deleteEntity()'
    }
  }
}
