// Example code taken from : https://medium.com/@whmartins/arquitetura-hexagonal-ports-and-adapters-na-pr%C3%A1tica-com-typescript-42f6e113715b

export class SubscriptionPlan {
    private id: string
    private title!: string
    private price!: number

    constructor(id: string, title: string, price: number) {
        this.id = id
        this.setTitle(title)
        this.setPrice(price)
    }

    public getId() { return this.id }

    private setTitle(title: string) {
        if (!title) { throw new Error('Title is invalid') }

        this.title = title
    }

    public getTitle() { return this.title }

    private setPrice(price: number) {
        if (price < 0) { throw new Error('Price should be greater than 0') }

        this.price = price
    }

    public getPrice() { return this.price }
}