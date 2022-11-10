import { PesquisaCliente } from "../dominio/portas/PesquisaCliente";
import { RepositorioImpl } from "./RepositorioImpl";

/**
 * Adaptador Web
 */
export class ClinicaSocialWeb {
  private express: any
  private router: any

  /**
   * Portas de entrada/serviços disponibilizados pelo sistema
   * devem ser repassados como parâmetros do construtor.
   */
  private pesquisaCliente: PesquisaCliente

  constructor(pesquisaCliente: PesquisaCliente) {
    this.express = require('express')
    this.router = this.express.Router()
    this.pesquisaCliente = pesquisaCliente
  }

  public getRouter() {
    return this.router
  }
  public getExpress() {
    return this.express
  }

  public start() {
    this.router.post('/add/:entity_type', (req: any, res:any) => {
      const repo = new RepositorioImpl(res)
      const data = req.body
      const entity_type = req.params.entity_type;
      repo.addEntity(data, entity_type)
    })
    this.router.get('/get-all/:entity_type', (req: any, res:any) => {
      const repo = new RepositorioImpl(res)
      const entity_type = req.params.entity_type;
      repo.getAllEntities(entity_type)
    })
    this.router.get('/get-user/:entity_type/:cpf', (req: any, res:any) => {
      const repo = new RepositorioImpl(res)
      const cpf = req.params.cpf
      const entity_type = req.params.entity_type;
      repo.getUserEntity(cpf, entity_type)
    })
    this.router.put('/update/:entity_type/:id', (req: any, res:any) => {
      const repo = new RepositorioImpl(res)
      const id = req.params.id;
      const data = req.body;
      const entity_type = req.params.entity_type;
      repo.updateEntity(id, data, entity_type)
    })
    this.router.delete('/delete/:entity_type/:id', (req: any, res:any) => {
      const repo = new RepositorioImpl(res)
      const id = req.params.id;
      const entity_type = req.params.entity_type;
      repo.deleteEntity(id, entity_type)
    })
  }
}