/**
 * Porta de saída que declara os serviços requeridos pelo sistema.
 */
export interface Repositorio {
  addEntity(data: any, entity_type: string) : any
  getAllEntities(entity_type: string) : any
  getEntity(id: null, entity_type: string) : any
  updateEntity(id: any, data: any, entity_type: string) : any
  deleteEntity(id: any, entity_type: string) : any
}