import { db } from '../db'
import { Cliente } from '../dominio/entidades/Cliente'
import { RepositorioCliente } from '../dominio/portas/RepositorioCliente'

const firestore = db.firestore()

/**
 * Adaptador para o Banco de Dados
 */
export class RepositorioClienteImpl implements RepositorioCliente {
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
  public addCliente = async (data: any) => {
    try {
      await firestore.collection('clientes').doc().set(data)
      this.res.send('Cliente adicionado com sucesso.')

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
  public getAllClientes = async () => {
    try {
      const collectionClientes = await firestore.collection('clientes')
      const data = await collectionClientes.get()
      const clientes: Cliente[] = []

      if (data.empty) {
        this.res.status(404).send('Não há clientes cadastrados na database.')
      } else {
        data.forEach(doc => {
          const cliente = new Cliente(
            doc.id,
            doc.data().nome,
            doc.data().cpf,
            doc.data().telefone,
            doc.data().email,
            doc.data().endereco
          )
          clientes.push(cliente)
        })

        this.res.send(clientes)
        return clientes
      }

    } catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: getAllClientes()', error)
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
  public getCliente = async (id: any) => {
    try {
      const cliente = await firestore.collection('clientes').doc(id)
      const data = await cliente.get()

      if (!data.exists) {
        this.res.status(404).send('Não foi encontrado um cliente com esse ID.')
      } else {
        this.res.send(data.data())
      }
    } catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: getCliente()', error)
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
  public updateCliente = async (id: any, data: any) => {
    try {
      const cliente = await firestore.collection('clientes').doc(id);
      await cliente.update(data);
      this.res.send('Dados do cliente atualizados com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: updateCliente()', error)
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
  public deleteCliente = async (id: any) => {
    try {
      await firestore.collection('clientes').doc(id).delete();
      this.res.send('Cliente deletado com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        this.res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: deleteCliente()', error)
      }
    }
  }
}
