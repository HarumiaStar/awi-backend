import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public author: string

  @column()
  public editor: string

  @column()
  public maxPlayers: number

  @column()
  public minPlayers: number

  @column()
  public minAge: number

  @column()
  public duration: number

  @column()
  public toAnimate: boolean

  @column()
  public recieved: boolean

  @column()
  public type: string

  @column()
  public mechanics: string

  @column()
  public theme: string

  @column()
  public tags: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public logo: string

  @column()
  public video: string

  @column()
  public manual: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static async generateUuid(model: Game) {
    model.id = randomUUID()
  }
}
