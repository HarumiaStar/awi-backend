import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'game_zones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.string('game_id').references('id').inTable('games').primary()
      table.string('zone_id').references('id').inTable('zones').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
