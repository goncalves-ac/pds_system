/**
 * Superclasse base para entidades.
 */
export class User {
  private id: string
  private nome: string
  private cpf: string
  private telefone: string
  private email: string

  /**
   * Information that will be stored in the endereco map:
   * - cep
   * - estado
   * - cidade
   * - bairro
   * - rua
   * - numero
   * - complemento
   */
  private endereco: Map<string, string>

  /**
   * Getters
   */
  public getId(): string {
    return this.id
  }
  public getName(): string {
    return this.nome
  }
  public getCPF(): string {
    return this.cpf
  }
  public getPhone(): string {
    return this.telefone
  }
  public getEmail(): string {
    return this.email
  }
  public getAddress(): Map<string, string> {
    return this.endereco
  }

  /**
   * Setters
   */
  protected setId(id: string): void {
    this.id = id
  }
  setName(nome: string): void {
    this.nome = nome
  }
  setCPF(cpf: string): void {
    this.cpf = cpf
  }
  setPhone(telefone: string): void {
    this.telefone = telefone
  }
  setEmail(email: string): void {
    this.email = email
  }
  setAddress(endereco: Map<string, string>): void {
    this.endereco = endereco
  }

  constructor(
    id: string, nome: string, cpf: string, telefone: string, email: string, endereco: Map<string, string>
  ) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.telefone = telefone
    this.email = email
    this.endereco = endereco
  }
}