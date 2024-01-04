import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FoodRegimeEnum, LodgingEnum, TshirtSizeEnum } from 'App/Models/Volunteer'

export default class RegisterVolunteerValidator {
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
    firstname: schema.string([
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    lastname: schema.string([
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    email: schema.string([
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.email({
        ignoreMaxLength: true,
        allowIpDomain: true,
        domainSpecificValidation: true,
      }),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.unique({ table: 'volunteers', column: 'email' }),
    ]),
    tshirt_size: schema.enum(Object.values(TshirtSizeEnum)),
    nb_edition_performed: schema.bigint([rules.required(), rules.trim(), rules.escape()]),
    lodging: schema.enum(Object.values(LodgingEnum)),
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
    food_regime: schema.enum(Object.values(FoodRegimeEnum)),
    is_admin: schema.boolean(),
    is_present: schema.boolean(),
    password: schema.string([rules.required(), rules.trim(), rules.minLength(8)]),
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
