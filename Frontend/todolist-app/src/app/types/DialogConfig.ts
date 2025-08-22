import { Action } from "./DialogFormConfig";

export interface DialogConfig {
    title: string,
    message: string,
    actions: Action[]
}