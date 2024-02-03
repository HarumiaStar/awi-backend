import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer'

export default class UpdateVolunteerValidator {
  constructor(protected ctx: HttpContextContract) {}

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
    firstname: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    lastname: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    email: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.email({
        ignoreMaxLength: true,
        allowIpDomain: true,
      }),
      rules.unique({ table: 'volunteers', column: 'email' }),
    ]),
    tshirt_size: schema.enum.optional(Object.values(TshirtSizeEnum)),
    nb_edition_performed: schema.number.optional([rules.trim(), rules.escape()]),
    lodging: schema.enum.optional(Object.values(LodgingEnum)),
    address: schema.string.nullableAndOptional([
      rules.trim(),
      rules.escape(),
      rules.minLength(10),
      rules.maxLength(255),
    ]),
    phone: schema.string.nullableAndOptional([
      rules.trim(),
      rules.escape(),
      rules.mobile({ locale: ['fr-FR', 'fr-BE'] }),
      rules.minLength(10),
    ]),
    username: schema.string.nullableAndOptional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    avatar_url: schema.string.nullableAndOptional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    food_regime: schema.enum.optional(Object.values(FoodRegimeEnum)),
    is_admin: schema.boolean.optional(),
    is_present: schema.boolean.optional(),
    password: schema.string.optional([rules.trim(), rules.minLength(8)]),
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
