import { User } from './super-classes/User'

export class Secretarias extends User {
    private workDays: string
    private workHours: string

    /**
     * Getters
     */
    public getWorkDays(): string {
        return this.workDays
    }
    public getWorkHours(): string {
        return this.workHours
    }

    /**
     * Setters
     */
    protected setWorkDays(workDays: string): void {
        this.workDays = workDays
    }
    protected setWorkHours(workHours:string): void {
        this.workHours = workHours
    }

    constructor(
        id: string, name: string, cpf: string, phone: string, address: Map<string, string>,
        workDays: string, workHours: string
    ) {
        super(id, name, cpf, phone, address)
        this.workDays = workDays
        this.workHours = workHours
    }
}