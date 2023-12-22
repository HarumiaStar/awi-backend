import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
export default class Festival extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public startDate: Date

  @column()
  public endDate: Date

  @column()
  public address: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Festival) {
    model.id = randomUUID()
  }
}
