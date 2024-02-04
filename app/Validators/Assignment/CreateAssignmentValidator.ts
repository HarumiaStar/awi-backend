import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAssignmentValidator {
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
    volunteer_id: schema.string([
      rules.required(),
      rules.uuid(),
      rules.exists({ table: 'volunteers', column: 'id' }),
      rules.unique({ table: 'assignments', column: 'volunteer_id' }),
    ]),
    zone_id: schema.string([
      rules.required(),
      rules.uuid(),
      rules.exists({ table: 'zones', column: 'id' }),
    ]),
    slot_id: schema.string([
      rules.required(),
      rules.uuid(),
      rules.exists({ table: 'slots', column: 'id' }),
    ]),
    is_referent: schema.boolean([rules.required()]),
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
