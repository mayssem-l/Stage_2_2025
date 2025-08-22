export interface DialogFormConfig {
    title: string,
    fields: Field[],
    actions: Action[]
}

export interface Field {
    id: number,
    displayName: string,
    internalName: string,
    value: string,
    hidden?: boolean,
    readonly?: boolean
}

export interface Action {
    id: number,
    displayName?: string,
    internalName: string,
    icon?: string,
    onClick: (...args: unknown[]) => unknown
}