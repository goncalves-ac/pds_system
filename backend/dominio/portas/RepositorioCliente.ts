/**
 * Porta de saída que declara os serviços requeridos pelo sistema.
 */
export interface RepositorioCliente {
  addCliente(data: any) : any
  getAllClientes() : any
  getCliente(id: null) : any
  updateCliente(id: any, data: any) : any
  deleteCliente(id: any) : any
}