// 👇 constant value in all uppercase
export const FREE_QUOTA = {
    maxEventsPerMonth: 100,
    maxEventCategories: 3,
    price: 0
} as const

export const PRO_QUOTA = {
    maxEventsPerMonth: 1000,
    maxEventCategories: 10,
    price: 7500
} as const