export class User {
    private id: string
    private name: string
    private cpf: string
    private phone: string

    /**
     * Information that will be stored in the address map:
     * - cep
     * - estado
     * - cidade
     * - bairro
     * - rua
     * - numero
     * - complemento
     */
    private address: Map<string, string>

    /**
     * Getters
     */
    public getId(): string {
        return this.id
    }
    public getName(): string {
        return this.name
    }
    public getCPF(): string {
        return this.cpf
    }
    public getPhone(): string {
        return this.phone
    }
    public getAddress(): Map<string, string> {
        return this.address
    }

    /**
     * Setters
     */
    protected setId(id: string): void {
        this.id = id
    }
    setName(name: string): void {
        this.name = name
    }
    setCPF(cpf: string): void {
        this.cpf = cpf
    }
    setPhone(phone: string): void {
        this.phone = phone
    }
    setAddress(address: Map<string, string>): void {
        this.address = address
    }

    constructor(
        id: string, name: string, cpf: string, phone: string, address: Map<string, string>
    ) {
        this.id = id
        this.name = name
        this.cpf = cpf
        this.phone = phone
        this.address = address
    }
}