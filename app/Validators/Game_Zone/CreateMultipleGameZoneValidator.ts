import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateMultipleGameZoneValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        gameZones: schema.array().members(
            schema.object().members({
                gameId: schema.string([
                    rules.required(),
                    rules.exists({ table: 'games', column: 'id' }),
                ]),
                zoneId: schema.string([
                    rules.required(),
                    rules.exists({ table: 'zones', column: 'id' }),
                ]),
            })
        ),
    })

    public messages: CustomMessages = {}
}
