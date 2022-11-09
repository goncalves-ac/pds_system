import { Request, Response, NextFunction } from 'express'
import { db } from '../db'
import { Cliente } from '../dominio/entidades/Cliente'
import { RepositorioCliente } from '../dominio/repositorios/RepositorioCliente'

const firestore = db.firestore()

export class RepositorioClienteImpl implements RepositorioCliente {
  /**
   * Adiciona um cliente à base de dados.
   *
   * O parâmetro request deve necessariamente conter em seu body
   * um Json que respeita o formato estipulado pela classe Cliente.
   * Caso o Json fuja dos padrões, será retornada uma mensagem
   * de erro contextualizada.
   *
   * @param req
   * @param res
   * @param next
   */
  public addCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      await firestore.collection('clientes').doc().set(data)
      res.send('Cliente adicionado com sucesso.')

    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: addCliente()', error)
      }
    }
  }

  /**
   * Retorna todos os clientes presentes na database.
   *
   * @param req
   * @param res
   * @param next
   */
  public getAllClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collectionClientes = await firestore.collection('clientes')
      const data = await collectionClientes.get()
      const clientes: Cliente[] = []

      if (data.empty) {
        res.status(404).send('Não há clientes cadastrados na database.')
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

        res.send(clientes)
      }

    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
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
   * @param req
   * @param res
   * @param next
   */
  public getCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idCliente = req.params.id
      const cliente = await firestore.collection('clientes').doc(idCliente)
      const data = await cliente.get()

      if (!data.exists) {
        res.status(404).send('Não foi encontrado um cliente com esse ID.')
      } else {
        res.send(data.data())
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: getCliente()', error)
      }
    }
  }

  /**
   * Atualiza os dados de um cliente presente na base de dados.
   *
   * O parâmetro request deve necessariamente conter em seu body
   * um Json que respeita o formato estipulado pela classe Cliente.
   * Caso o Json fuja dos padrões, será retornada uma mensagem
   * de erro contextualizada.
   *
   * O request deve conter em sua rota o parâmetro id, o
   * qual é o identificador único do cliente na base de dados.
   *
   * Ex: .../api/update-cliente/id_do_cliente
   *
   * @param req
   * @param res
   * @param next
   */
  public updateCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const cliente = await firestore.collection('clientes').doc(id);
      await cliente.update(data);
      res.send('Dados do cliente atualizados com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
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
   * @param req
   * @param res
   * @param next
   */
  public deleteCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await firestore.collection('clientes').doc(id).delete();
      res.send('Cliente deletado com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
      } else {
        console.log('Erro inesperado: deleteCliente()', error)
      }
    }
  }
}
