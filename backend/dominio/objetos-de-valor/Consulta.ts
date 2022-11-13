import { UnidadeOrganizacional } from "../super-classes/UnidadeOrganizacional"

export class Consulta extends UnidadeOrganizacional {
  private hora: string

  /**
   * Getters
   */
   public getHora(): string {
    return this.hora
  }

  /**
   * Setters
   */
  protected setHora(hora: string): void {
    this.hora = hora
  }

  constructor(
    id: string, nomeCliente: string, nomePsicologo: string, dia: string, mes: string, ano:string,
    hora: string
  ) {
    super(id, nomeCliente, nomePsicologo, dia, mes, ano)
    this.hora = hora
  }
}