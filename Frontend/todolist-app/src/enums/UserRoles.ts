export const UserRole = {
    ADMIN: "admin",
    USER: "role"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];