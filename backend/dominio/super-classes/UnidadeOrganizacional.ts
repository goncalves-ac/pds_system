export class UnidadeOrganizacional {
  private id: string
  private nomeCliente: string
  private nomePsicologo: string
  private dia: string
  private mes: string
  private ano: string

  constructor(id: string, nomeCliente: string, nomePsicologo: string, dia: string, mes: string, ano: string) {
    this.id = id
    this.nomeCliente = nomeCliente
    this.nomePsicologo = nomePsicologo
    this.dia = dia
    this.mes = mes
    this.ano = ano
  }

  /**
   * Getters
   */
  public getId(): string {
    return this.id
  }
  public getNomeCliente(): string {
    return this.nomeCliente
  }
  public getNomePSicologo(): string {
    return this.nomePsicologo
  }
  public getDia(): string {
    return this.dia
  }
  public getMes(): string {
    return this.mes
  }
  public getAno(): string {
    return this.ano
  }

  /**
   * Setters
   */
  protected setNomeCliente(nomeCliente: string): void {
    this.nomeCliente = nomeCliente
  }
  protected setNomePsicologo(nomePsicologo: string): void {
    this.nomePsicologo = nomePsicologo
  }
  protected setDia(dia: string): void {
    this.dia = dia
  }
  protected setMes(mes: string): void {
    this.mes = mes
  }
  protected setAno(ano: string): void {
    this.ano = ano
  }
}