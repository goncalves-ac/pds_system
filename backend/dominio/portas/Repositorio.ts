/**
 * Porta de saída que declara os serviços requeridos pelo sistema.
 */
export interface Repositorio {
  addEntity(data: any, entity_type: string) : any

  getAllEntities(entity_type: string) : any

  getUserEntity(cpf: string, entity_type: string) : any

  updateEntity(id: string, data: any, entity_type: string) : any

  deleteEntity(id: string, entity_type: string) : any
}