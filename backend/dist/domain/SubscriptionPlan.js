"use strict";
// Example code taken from : https://medium.com/@whmartins/arquitetura-hexagonal-ports-and-adapters-na-pr%C3%A1tica-com-typescript-42f6e113715b
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlan = void 0;
class SubscriptionPlan {
    constructor(id, title, price) {
        this.id = id;
        this.setTitle(title);
        this.setPrice(price);
    }
    getId() { return this.id; }
    setTitle(title) {
        if (!title) {
            throw new Error('Title is invalid');
        }
        this.title = title;
    }
    getTitle() { return this.title; }
    setPrice(price) {
        if (price < 0) {
            throw new Error('Price should be greater than 0');
        }
        this.price = price;
    }
    getPrice() { return this.price; }
}
exports.SubscriptionPlan = SubscriptionPlan;
