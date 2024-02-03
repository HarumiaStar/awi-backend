import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSlotValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        startTime: schema.date({ format: 'dd/MM/yyyy HH:mm' }, [
            rules.required(),
        ]),
        endTime: schema.date({ format: 'dd/MM/yyyy HH:mm' }, [
            rules.required(),
        ]),
    })

    public messages: CustomMessages = {}
}
