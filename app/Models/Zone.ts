import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Post from 'App/Models/Post'
import Festival from 'App/Models/Festival'

export default class Zone extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public idZone: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public maxCapacity: number
  @column()
  public animation: boolean

  @column()
  public festivalId: string

  @belongsTo(() => Festival)
  public festival: BelongsTo<typeof Festival>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Zone) {
    model.id = randomUUID()
  }
}
