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

  public getRouter() {
    return this.router
  }
  public getExpress() {
    return this.express
  }

  public start() {
    this.router.post('/add/:entity_type', (req: any, res:any) => {
      const data = req.body
      const entity_type = req.params.entity_type;
      const promessa = this.crud.adicionarEntidade(data, entity_type)
      promessa.then((resposta:any) => {
        res.send(resposta)
      })
    })
    this.router.get('/get-all/:entity_type', (req: any, res:any) => {
      const entity_type = req.params.entity_type;
      const promessa = this.crud.retornarTodasEntidades(entity_type)
      promessa.then((entidadeusuario:any) => {
        res.send(entidadeusuario)
      })
    })
    this.router.get('/get-user/:entity_type/:cpf', (req: any, res:any) => {
      const cpf = req.params.cpf
      const entity_type = req.params.entity_type;
      const promessa = this.crud.retornarEntidadeUsuario(cpf, entity_type)
      promessa.then((entidades:any) => {
        res.send(entidades)
      })
    })
    this.router.put('/update/:entity_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const data = req.body;
      const entity_type = req.params.entity_type;
      const promessa = this.crud.atualizarEntidade(id, data, entity_type)
      promessa.then((resposta:any) => {
        res.send(resposta)
      })
    })
    this.router.delete('/delete/:entity_type/:id', (req: any, res:any) => {
      const id = req.params.id;
      const entity_type = req.params.entity_type;
      const promessa = this.crud.deletarEntidade(id, entity_type)
      promessa.then((resposta:any) => {
        res.send(resposta)
      })
    })
  }
}