import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateZoneValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        name: schema.string([
            rules.required(),
            rules.trim(),
            rules.escape(),
            rules.minLength(3),
            rules.maxLength(255),
        ]),
        description: schema.string.optional([
            // rules.required(),
            rules.trim(),
            rules.escape(),
            rules.minLength(3),
            rules.maxLength(255),
        ]),
        maxCapacity: schema.number([
            rules.required(),
            rules.range(1, 1000),
        ]),
        animation: schema.boolean([
            rules.required(),
        ]),
        festivalId: schema.string([
            rules.required(),
            rules.exists({ table: 'festivals', column: 'id' }),
        ]),
    })

    public messages: CustomMessages = {}
}
