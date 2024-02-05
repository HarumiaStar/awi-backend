import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Volunteer from 'App/Models/Volunteer'
import Slot from 'App/Models/Slot'
import Zone from 'App/Models/Zone'

export default class Wishe extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public volunteerId: string

  @belongsTo(() => Volunteer)
  public volunteer: BelongsTo<typeof Volunteer>

  @column()
  public zoneId: string

  @belongsTo(() => Zone)
  public zone: BelongsTo<typeof Zone>

  @column()
  public slotId: string

  @belongsTo(() => Slot)
  public slot: BelongsTo<typeof Slot>

  @column()
  public isReferent: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(model: Wishe) {
    model.id = randomUUID()
  }
}
