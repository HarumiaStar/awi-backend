import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'node:crypto'
import Post from 'App/Models/Post'
import Festival from 'App/Models/Festival'

export default class Zone extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public maxCapacity: bigint

  @column()
  public postId: bigint

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column()
  public festivalId: bigint

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
