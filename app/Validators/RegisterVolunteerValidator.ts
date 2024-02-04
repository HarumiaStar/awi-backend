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
      }),
      rules.normalizeEmail({
        allLowercase: true,
        gmailRemoveDots: true,
        gmailRemoveSubaddress: true,
      }),
      rules.unique({ table: 'volunteers', column: 'email' }),
    ]),
    tshirt_size: schema.enum(Object.values(TshirtSizeEnum)),
    nb_edition_performed: schema.number([rules.required(), rules.trim(), rules.escape()]),
    lodging: schema.enum(Object.values(LodgingEnum)),
    address: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(10),
      rules.maxLength(255),
    ]),
    phone: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.mobile({ locale: ['fr-FR', 'fr-BE'] }),
      rules.minLength(10),
    ]),
    username: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    avatar_url: schema.string.optional([
      rules.trim(),
      rules.escape(),
      rules.minLength(2),
      rules.maxLength(255),
    ]),
    food_regime: schema.enum(Object.values(FoodRegimeEnum)),
    password: schema.string([rules.required(), rules.trim(), rules.minLength(8)]),
    associations: schema.array.optional().members(
      schema.string([
        rules.uuid(),
        rules.exists({
          table: 'associations',
          column: 'id',
        }),
      ])
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
  public messages: CustomMessages = {
    'firstname.required': 'Le prénom est requis',
    'firstname.minLength': 'Le prénom doit contenir au moins 2 caractères',
    'firstname.maxLength': 'Le prénom doit contenir au maximum 255 caractères',
    'lastname.required': 'Le nom est requis',
    'lastname.minLength': 'Le nom doit contenir au moins 2 caractères',
    'lastname.maxLength': 'Le nom doit contenir au maximum 255 caractères',
    'email.required': "L'email est requis",
    'email.email': "L'email doit être valide",
    'email.minLength': "L'email doit contenir au moins 3 caractères",
    'email.unique': "L'email est déjà utilisé",
    'tshirt_size.required': 'La taille de t-shirt est requise',
    'tshirt_size.enum': 'La taille de t-shirt doit être valide',
    'nb_edition_performed.required': "Le nombre d'éditions effectuées est requis",
    'nb_edition_performed.bigint': "Le nombre d'éditions effectuées doit être valide",
    'lodging.required': 'Le type de logement est requis',
    'lodging.enum': 'Le type de logement doit être valide',
    'address.minLength': "L'adresse doit contenir au moins 10 caractères",
    'address.maxLength': "L'adresse doit contenir au maximum 255 caractères",
    'phone.mobile': 'Le numéro de téléphone doit être valide',
    'phone.minLength': 'Le numéro de téléphone doit contenir au moins 10 caractères',
    'username.minLength': "Le nom d'utilisateur doit contenir au moins 2 caractères",
    'username.maxLength': "Le nom d'utilisateur doit contenir au maximum 255 caractères",
    'avatar_url.minLength': "L'URL de l'avatar doit contenir au moins 2 caractères",
    'avatar_url.maxLength': "L'URL de l'avatar doit contenir au maximum 255 caractères",
    'food_regime.required': 'Le régime alimentaire est requis',
    'food_regime.enum': 'Le régime alimentaire doit être valide',
    'is_admin.boolean': 'Le statut administrateur doit être valide',
    'is_present.boolean': 'Le statut présent doit être valide',
    'password.required': 'Le mot de passe est requis',
    'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères',
  }
}
