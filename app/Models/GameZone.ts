import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Game from './Game'
import Zone from './Zone'

export default class GameZone extends BaseModel {

  @column()
  public gameId: string

  @belongsTo(() => Game)
  public game: BelongsTo<typeof Game>

  @column()
  public zoneId: string

  @belongsTo(() => Zone)
  public zone: BelongsTo<typeof Zone>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
