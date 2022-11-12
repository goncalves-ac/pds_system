import { CRUD } from "../dominio/portas/CRUD";

/**
 * Adaptador Web
 */
export class ClinicaSocialWeb {
  private express: any
  private router: any

  /**
   * Portas de entrada/serviços disponibilizados pelo sistema
   * devem ser repassados como parâmetros do construtor do adaptador Web.
   */
  private crud: CRUD

  constructor(crudService: CRUD) {
    this.express = require('express')
    this.router = this.express.Router()
    this.crud = crudService
  }

  /**
   * Retorna todas as rotas utilizadas pelo adaptador web.
   */
  public getRouter() {
    return this.router
  }

  private returnAnswer(resposta: any, res: any): void {
    if (typeof resposta === 'string') {
      res.send(resposta)
    } else if (this.checkIfPromise(resposta)) {
      resposta.then((resposta:any) => {
        res.send(resposta)
      })
    } else {
      res.send('Resposta inesperada. Favor contatar os administradores.')
    }
  }

  private checkIfPromise(resposta: any): boolean {
    if (
      typeof resposta === 'object' &&
      typeof resposta.then === 'function'
      ) {
      return true;
    }
    return false;
  }

  public start() {
    this.router.post('/add/:entity_type', (req: any, res:any) => {
      const data = req.body
      const entity_type = req.params.entity_type;
      const resposta = this.crud.adicionarEntidade(data, entity_type)
      this.returnAnswer(resposta, res)
    })
    this.router.get('/get-all/:entity_type', (req: any, res:any) => {
      const entity_type = req.params.entity_type;
      const resposta = this.crud.retornarTodasEntidades(entity_type)
      this.returnAnswer(resposta, res)
    })
    this.router.get('/get-user/:entity_type/:cpf', (req: any, res:any) => {
      const cpf = req.params.cpf
      const entity_type = req.params.entity_type;
      const resposta = this.crud.retornarEntidadeUsuario(cpf, entity_type)
      this.returnAnswer(resposta, res)
    })
    this.router.put('/update/:entity_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const data = req.body;
      const entity_type = req.params.entity_type;
      const resposta = this.crud.atualizarEntidade(id, data, entity_type)
      this.returnAnswer(resposta, res)
    })
    this.router.delete('/delete/:entity_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const entity_type = req.params.entity_type;
      const resposta = this.crud.deletarEntidade(id, entity_type)
      this.returnAnswer(resposta, res)
    })
  }
}