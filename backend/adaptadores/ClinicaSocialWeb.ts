import { PesquisaCliente } from "../dominio/portas/PesquisaCliente";
import { RepositorioClienteImpl } from "./RepositorioClienteImpl";

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
    this.router.post('/add-cliente', (req: any, res:any) => {
      const repo = new RepositorioClienteImpl(res)
      const data = req.body
      repo.addCliente(data)
    })
    this.router.get('/get-all-clientes', (req: any, res:any) => {
      const repo = new RepositorioClienteImpl(res)
      repo.getAllClientes()
    })
    this.router.get('/get-cliente/:id', (req: any, res:any) => {
      const repo = new RepositorioClienteImpl(res)
      const id = req.params.id
      repo.getCliente(id)
    })
    this.router.put('/update-cliente/:id', (req: any, res:any) => {
      const repo = new RepositorioClienteImpl(res)
      const id = req.params.id;
      const data = req.body;
      repo.updateCliente(id, data)
    })
    this.router.delete('/delete-cliente/:id', (req: any, res:any) => {
      const repo = new RepositorioClienteImpl(res)
      const id = req.params.id;
      repo.deleteCliente(id)
    })
  }
}