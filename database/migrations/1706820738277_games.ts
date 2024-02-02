import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      
      // Basics
      table.integer('id_game').notNullable().unique()
      table.string('name').notNullable()
      table.string('author').nullable()
      table.string('editor').notNullable()
      table.integer('max_players').nullable()
      table.integer('min_players').nullable()
      table.integer('min_age').nullable()
      table.integer('duration').nullable()
      table.boolean('to_animate').notNullable()
      table.boolean('recieved').notNullable()
      
      // Details
      table.string('type').nullable()
      table.string('mechanics').nullable()
      table.string('theme').nullable()
      table.string('tags').nullable()
      table.text('description').nullable()
      
      // Links
      table.string('image').nullable()
      table.string('logo').nullable()
      table.string('video').nullable()
      table.text('manual').nullable()

      // Dates
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
