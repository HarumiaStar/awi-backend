import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewFestivalValidator {
    constructor(protected ctx: HttpContextContract) { }

    /*
     * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
     *
     * For example:
     * 1. The username must be of data type string. But then also, it should
     *    not contain special characters or numbers.
     *    ```
     *     schema.string([ rules.alpha() ])
     *    ```
     *
     * 2. The email must be of data type string, formatted as a valid
     *    email. But also, not used by any other user.
     *    ```
     *     schema.string([
     *       rules.email(),
     *       rules.unique({ table: 'users', column: 'email' }),
     *     ])
     *    ```
     */
    public schema = schema.create({
        title: schema.string([
            rules.required(),
            rules.trim(),
            rules.escape(),
            rules.minLength(10),
            rules.maxLength(255),
        ]),
        start_date: schema.date({ format: 'dd/MM/yyyy' }, [rules.required()]),
        end_date: schema.date({ format: 'dd/MM/yyyy' }, [rules.required()]),
        address: schema.string([
            rules.required(),
            rules.trim(),
            rules.escape(),
            rules.minLength(10),
            rules.maxLength(255),
        ]),
        description: schema.string([
            rules.required(),
            rules.trim(),
            rules.escape(),
            rules.minLength(10),
            rules.maxLength(255),
        ]),
        poster_path: schema.string.optional([
            rules.trim(),
            rules.escape(),
            rules.minLength(10),
            rules.maxLength(255),
        ]),
        games: schema.array().members(
            schema.object().members({
                idGame: schema.number([
                    rules.required(),
                    
                ]),
                name: schema.string([
                    rules.required(),
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                author: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                editor: schema.string([
                    rules.required(),
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
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
                toAnimate: schema.boolean([
                    rules.required(),
                ]),
                recieved: schema.boolean.optional(),
                type: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                mechanics: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                theme: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                tags: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
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
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                logo: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                video: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                manual: schema.string.optional([
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
            })
        ),
        zones: schema.array().members(
            schema.object().members({
                idZone: schema.number([
                    rules.required(),
                ]),
                name: schema.string([
                    rules.required(),
                    rules.trim(),
                    rules.escape(),
                    rules.minLength(3),
                    rules.maxLength(255),
                ]),
                description: schema.string.optional([
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
            })
        ),
        slots: schema.array().members(
            schema.object().members({
                startTime: schema.date({ format: 'dd/MM/yyyy HH:mm' }, [
                    rules.required(),
                ]),
                endTime: schema.date({ format: 'dd/MM/yyyy HH:mm' }, [
                    rules.required(),
                ]),
            })
        ),
        gameZones: schema.array().members(
            schema.object().members({
                idZone: schema.number([
                    rules.required(),
                ]),
                idJeu: schema.number([
                    rules.required(),
                ]),
            })
        ),
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
