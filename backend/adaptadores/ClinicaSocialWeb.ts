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
    this.router.post('/add/:object_type', (req: any, res:any) => {
      const data = req.body
      const object_type = req.params.object_type;
      const resposta = this.crud.adicionarObjeto(data, object_type)
      this.returnAnswer(resposta, res)
    })
    this.router.get('/get-all/:object_type', (req: any, res:any) => {
      const object_type = req.params.object_type;
      const resposta = this.crud.retornarTodosObjetos(object_type)
      this.returnAnswer(resposta, res)
    })
    this.router.get('/get-user/:entity_type/:cpf', (req: any, res:any) => {
      const cpf = req.params.cpf
      const entity_type = req.params.entity_type;
      const resposta = this.crud.retornarEntidadeUsuario(cpf, entity_type)
      this.returnAnswer(resposta, res)
    })
    this.router.put('/update/:object_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const data = req.body;
      const object_type = req.params.object_type;
      const resposta = this.crud.atualizarObjeto(id, data, object_type)
      this.returnAnswer(resposta, res)
    })
    this.router.delete('/delete/:object_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const object_type = req.params.object_type;
      const resposta = this.crud.deletarObjeto(id, object_type)
      this.returnAnswer(resposta, res)
    })
  }
}