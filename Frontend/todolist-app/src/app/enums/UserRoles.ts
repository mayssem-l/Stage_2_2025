export const UserRole = {
    ADMIN: "ADMIN",
    USER: "ROLE"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];