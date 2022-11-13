/**
 * Porta de saída que declara todos serviços requeridos pelo sistema.
 */
export interface Repositorio {
  addObject(data: any, entity_type: string) : any

  getAllObjects(entity_type: string) : any

  getUserEntity(cpf: string, entity_type: string) : any

  updateObject(id: string, data: any, entity_type: string) : any

  deleteObject(id: string, entity_type: string) : any
}