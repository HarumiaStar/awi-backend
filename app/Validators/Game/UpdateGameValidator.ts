import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class UpdateGameValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        idGame: schema.number.optional([
            rules.range(1, 100000),
        ]),
        name: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        author: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        editor: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        maxPlayers: schema.number.optional([
            rules.range(1, 100),
        ]),
        minPlayers: schema.number.optional([
            rules.range(1, 100),
        ]),
        minAge: schema.number.optional([
            rules.range(1, 100),
        ]),
        duration: schema.number.optional([
            rules.range(1, 1000),
        ]),
        toAnimate: schema.boolean.optional(),
        recieved: schema.boolean.optional(),
        type: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        mechanics: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        theme: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        tags: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(255),
        ]),
        description: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(0),
            rules.maxLength(5000),
        ]),
        image: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(5000),
        ]),
        logo: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(5000),
        ]),
        video: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(5000),
        ]),
        manual: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(2),
            rules.maxLength(5000),
        ]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages: CustomMessages = {}
}
