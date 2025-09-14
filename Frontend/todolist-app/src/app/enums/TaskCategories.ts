export const TaskCategory = {
    WORK: "WORK",
    PERSONAL: "PERSONAL",
    SHOPPING: "SHOPPING",
    HEALTH : "HEALTH",
    FINANCE : "FINANCE",
    URGENT: "URGENT",
    LEISURE : "LEISURE",
    OTHERS: "OTHERS"
} as const;
export type TaskCategory = typeof TaskCategory[keyof typeof TaskCategory];