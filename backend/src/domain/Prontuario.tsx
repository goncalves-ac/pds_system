export class Prontuario {
    private date: string
    private time: string
    private parecer: string

    /**
     * Getters
     */
    public getDate(): string {
        return this.date
    }
    public getTime(): string {
        return this.time
    }
    public getParecer(): string {
        return this.parecer
    }

    /**
     * Setters
     */
    protected setDate(date: string): void {
        this.date = date
    }
    protected setTime(time:string): void {
        this.time = time
    }
    public setParecer(parecer: string): void {
        this.parecer = parecer
    }

    constructor(
        date: string, time: string, parecer: string,
    ) {
        this.date = date
        this.time = time
        this.parecer = parecer
    }
}