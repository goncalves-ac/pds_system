/**
 * Porta de entrada: declara parte dos serviços disponibilizados pelo sistema.
 */
export interface CRUD {
  adicionarEntidade(data: any, entity_type: string) : any

  retornarTodasEntidades(entity_type: string): any

  retornarEntidadeUsuario(cpf: string, entity_type: string): any

  atualizarEntidade(id: string, data: any, entity_type: string) : any

  deletarEntidade(id: string, entity_type: string) : any
}