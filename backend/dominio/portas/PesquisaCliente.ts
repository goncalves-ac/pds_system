/**
 * Porta de entrada que declara os serviços disponibilizados pelo sistema.
 */
export interface PesquisaCliente {
  pesquisaCliente(nome: string): any
}