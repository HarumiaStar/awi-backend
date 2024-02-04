import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSlotValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        startTime: schema.date.optional({ format: 'dd/MM/yyyy HH:mm' }, ),
        endTime: schema.date.optional({ format: 'dd/MM/yyyy HH:mm' }, [
        ]),
    })

    public messages: CustomMessages = {}
}
