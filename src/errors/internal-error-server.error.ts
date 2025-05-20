import { ErrorBase } from "./base.error";

export class InternalServerError extends ErrorBase{
    constructor(message='error internal server'){
        super(500, message)
    }
}