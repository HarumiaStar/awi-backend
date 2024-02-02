import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGameZoneValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        gameId: schema.string([
            rules.required(),
            rules.exists({ table: 'games', column: 'id' }),
        ]),
        zoneId: schema.string([
            rules.required(),
            rules.exists({ table: 'zones', column: 'id' }),
        ]),
    })

    public messages: CustomMessages = {}
}
