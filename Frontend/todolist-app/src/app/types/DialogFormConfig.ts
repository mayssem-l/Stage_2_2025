import { InputField } from "./InputField"

export interface DialogFormConfig {
    title: string,
    fields: InputField[],
    actions: Action[]
}

export interface Field {
    id: number | string,
    displayName: string,
    internalName: string,
    value: string,
    hidden?: boolean,
    readonly?: boolean,
    options?: {value: string, displayName: string}[]
}


export interface Action {
    id: number,
    displayName?: string,
    internalName: string,
    icon?: string,
    onClick: (...args: unknown[]) => unknown
}