import { PesquisaCliente } from "../portas/PesquisaCliente";
import { Repositorio } from "../portas/Repositorio";

/**
 * Implementa os serviços relacionados a clientes
 */
export class PesquisaClienteImpl implements PesquisaCliente {
  private repo: Repositorio

  constructor(repo: Repositorio) {
    this.repo = repo
  }

  public pesquisaCliente(nome: string) {
    // return this.repo.getEntity()
  }
}