import { db } from '../db'
import { Cliente } from '../dominio/entidades/Cliente'
import { Secretaria } from '../dominio/entidades/Secretaria'
import { Psicologo } from '../dominio/entidades/Psicologo'
import { Prontuario } from '../dominio/objetos-de-valor/Prontuario'
import { Repositorio } from '../dominio/portas/Repositorio'
import { Consulta } from '../dominio/objetos-de-valor/Consulta'

const firestore = db.firestore()

/**
 * Adaptador para o Banco de Dados
 */
export class RepositorioImpl implements Repositorio {

  private treatError(errorMessage: string): string {
    console.log(errorMessage)
    return errorMessage
  }

  /**
   * Adiciona um cliente à base de dados.
   *
   * @param data Dados em formato json
   * @param object_type String que representa o tipo de objeto a ser adicionado.
   */
  public addObject = async (data: any, object_type: string) => {
    try {
      await firestore.collection(object_type).doc().set(data)
      return '(SUCESSO) Objeto do tipo:"' + object_type + '" adicionada ao banco de dados.'
    } catch (error) {
      return this.treatError('Erro inesperado: addObject()')
    }
  }

  /**
   * Retorna todos os clientes presentes na database.
   *
   * @param object_type String que representa o tipo de objeto a ser recuperada.
   */
  public getAllObjects = async (object_type: string) => {
    try {
      const collection = await firestore.collection(object_type)
      const data = await collection.get()
      const entities: any[] = []

      if (object_type === 'clientes') {
        data.forEach((doc: any) => {
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
      } else if (object_type === 'secretarias') {
        data.forEach((doc: any) => {
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
      } else if (object_type === 'psicologos') {
        data.forEach((doc: any) => {
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
      } else if (object_type === 'prontuarios') {
        data.forEach((doc: any) => {
          const prontuario = new Prontuario(
            doc.id,
            doc.data().nomeCliente,
            doc.data().nomePsicologo,
            doc.data().dia,
            doc.data().mes,
            doc.data().ano,
            doc.data().parecer
          )
          entities.push(prontuario)
        })
      } else if (object_type === 'consultas') {
        data.forEach((doc: any) => {
          const consulta = new Consulta(
            doc.id,
            doc.data().nomeCliente,
            doc.data().nomePsicologo,
            doc.data().dia,
            doc.data().mes,
            doc.data().ano,
            doc.data().hora
          )
          entities.push(consulta)
        })
      }
      return entities
    } catch (error) {
      return this.treatError('Erro inesperado: getAllObjects()')
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
        return this.treatError('Não foi encontrado uma entidade do tipo:"' + entity_type + '" com esse CPF.')
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
      return this.treatError('Erro inesperado: getUserEntity()')
    }
  }

  /**
   * Atualiza os dados de um objeto presente na base de dados.
   *
   * @param id String que representa o identifacor único do documento no banco de dados.
   * @param data Dados em formato json.
   * @param object_type String que representa o tipo de objeto a ser atualizada.
   */
  public updateObject = async (id: any, data: any, object_type: string) => {
    try {
      const cliente = await firestore.collection(object_type).doc(id);
      await cliente.update(data);
      return '(SUCESSO) Objeto do tipo:"' + object_type + '" atualizada no banco de dados.'
    } catch (error) {
      return this.treatError('Erro inesperado: updateObject(). Você provavelmente passou na rota um ID não existente.')
    }
  }

  /**
   * Deleta um documento/objeto persistido na database.
   *
   * @param id String que representa o identificador único do objeto no banco de dados.
   * @param object_type String que representa o tipo de objeto a ser deletado.
   */
  public deleteObject = async (id: any, object_type: string) => {
    try {
      await firestore.collection(object_type).doc(id).delete();
      return '(SUCESSO) Objeto do tipo:"' + object_type + '" deletada do banco de dados.'
    } catch (error) {
      return this.treatError('Erro inesperado: deleteObject(). Você provavelmente passou na rota um ID não existente.')
    }
  }
}
