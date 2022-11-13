/**
 * Porta de entrada: declara parte dos serviços disponibilizados pelo sistema.
 */
export interface CRUD {
  adicionarObjeto(data: any, entity_type: string) : any

  retornarTodosObjetos(entity_type: string): any

  retornarEntidadeUsuario(cpf: string, entity_type: string): any

  atualizarObjeto(id: string, data: any, entity_type: string) : any

  deletarObjeto(id: string, entity_type: string) : any
}