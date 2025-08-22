export const DashboardContent = {
    USER_LIST: "user_list",
    TASK_LIST: "task_list"
} as const;

export type DashboardContent = typeof DashboardContent[keyof typeof DashboardContent];