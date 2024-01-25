import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  manyToMany,
  ManyToMany,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomUUID } from 'node:crypto'
import Association from 'App/Models/Association'

export enum TshirtSizeEnum {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export enum LodgingEnum {
  propisition = 'proposition',
  recherche = 'recherche',
  aucun = 'aucun',
}

export enum FoodRegimeEnum {
  vegetarien = 'vegetarien',
  carnivore = 'carnivore',
  autre = 'autre',
}
export default class Volunteer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column({})
  public email: string

  @column()
  public address: string

  @column()
  public phone: string

  @column()
  public username: string

  @column()
  public avatarUrl: string

  @column()
  public nbEditionPerformed: bigint

  @column()
  public tshirtSize: TshirtSizeEnum

  @column()
  public lodging: LodgingEnum

  @column()
  public foodRegime: FoodRegimeEnum

  @column()
  public isAdmin: boolean

  @column()
  public isPresent: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @manyToMany(() => Association)
  public associations: ManyToMany<typeof Association>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Volunteer) {
    model.id = randomUUID()
  }

  @beforeSave()
  public static async hashPassword(volunteer: Volunteer) {
    if (volunteer.$dirty.password) {
      volunteer.password = await Hash.make(volunteer.password)
    }
  }
}
