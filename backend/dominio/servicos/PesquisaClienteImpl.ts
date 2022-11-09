import { PesquisaCliente } from "../portas/PesquisaCliente";
import { RepositorioCliente } from "../portas/RepositorioCliente";

/**
 * Implementa os serviços relacionados a clientes
 */
export class PesquisaClienteImpl implements PesquisaCliente {
  private repo: RepositorioCliente

  constructor(repo: RepositorioCliente) {
    this.repo = repo
  }

  public pesquisaCliente(nome: string) {
    // return this.repo.getCliente(nome)
  }
}