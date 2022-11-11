import { UnidadeOrganizacional } from "../super-classes/UnidadeOrganizacional"

export class Prontuario extends UnidadeOrganizacional {
  private parecer: string

  /**
   * Getters
   */
  public getParecer(): string {
    return this.parecer
  }

  /**
   * Setters
   */
  protected setParecer(parecer: string): void {
    this.parecer = parecer
  }

  constructor(
    id: string, nomeCliente: string, nomePsicologo: string, dia: string, mes: string, ano:string,
    parecer: string
  ) {
    super(id, nomeCliente, nomePsicologo, dia, mes, ano)
    this.parecer = parecer
  }
}