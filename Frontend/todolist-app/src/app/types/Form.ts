import { Action } from "./DialogFormConfig";
import { InputField } from "./InputField";

export interface FormAction extends Action {
    class?: string,
    message?: string
    messageClass?: string
}

export interface FormConfig {
    fields: InputField[],
    actions: FormAction[],
    onSubmit: () => unknown
}