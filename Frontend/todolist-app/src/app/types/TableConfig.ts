import { Action } from "./DialogFormConfig";

export interface TableConfig {
    data: string[][],
    headers: string[],
    entryActions: Action[]
}