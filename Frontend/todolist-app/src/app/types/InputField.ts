import { Field } from "./DialogFormConfig";

export interface InputField extends Field {
    isRequired?: boolean,
    type?: 'text' | 'password' | 'email' | 'number' | 'datetime-local' | string,
    class?: string,
}