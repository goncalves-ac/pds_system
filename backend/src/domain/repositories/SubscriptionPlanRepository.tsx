// Example code taken from : https://medium.com/@whmartins/arquitetura-hexagonal-ports-and-adapters-na-pr%C3%A1tica-com-typescript-42f6e113715b

import { SubscriptionPlan } from '../SubscriptionPlan'

export interface SubscriptionPlanRepository {
    save(plan: SubscriptionPlan): Promise<SubscriptionPlan>
    getPlan(id: string): Promise<SubscriptionPlan>
    getAvailablePlans(): Promise<SubscriptionPlan[]>
    getPlansWithPriceLimit(limit: number): Promise<SubscriptionPlan[]>
}