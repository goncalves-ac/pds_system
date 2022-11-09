import { User } from '../super-classes/User'
import { Prontuario } from './Prontuario'
import { Cliente } from './Cliente'

export class Psicologos extends User {
  private crp: string
  private workDays: string
  private especialidade: string
  /**
   * Possible to iterate through both keys and values
   * - map.keys() – to iterate over Clientes
   * - map.values() – to iterate over Prontuarios
   */
  private prontuarios: Map<Cliente, Prontuario>

  /**
   * Getters
   */
  public getCrp(): string {
    return this.crp
  }
  public getWorkDays(): string {
    return this.workDays
  }
  public getEspecialidade(): string {
    return this.especialidade
  }
  public getProntuarios(): Map<Cliente, Prontuario> {
    return this.prontuarios
  }

  /**
   * Setters
   */
  protected setCrp(crp: string): void {
    this.crp = crp
  }
  protected setWorkDays(workDays: string): void {
    this.workDays = workDays
  }

  constructor(
    id: string, name: string, cpf: string, phone: string, email: string, address: Map<string, string>,
    crp: string, workDays: string, especialidade: string,
  ) {
    super(id, name, cpf, phone, email, address)
    this.crp = crp
    this.workDays = workDays
    this.especialidade = especialidade
    this.prontuarios = new Map()
  }
}