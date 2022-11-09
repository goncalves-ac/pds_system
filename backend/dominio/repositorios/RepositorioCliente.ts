import { Request, Response, NextFunction } from 'express'

export interface RepositorioCliente {
  addCliente(req: Request, res: Response, next: NextFunction) : any
  getAllClientes(req: Request, res: Response, next: NextFunction) : any
  getCliente(req: Request, res: Response, next: NextFunction) : any
  updateCliente(req: Request, res: Response, next: NextFunction) : any
  deleteCliente(req: Request, res: Response, next: NextFunction) : any
}