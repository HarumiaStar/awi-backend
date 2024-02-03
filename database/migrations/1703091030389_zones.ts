import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'zones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('id_zone').notNullable().unique()
      table.string('name').notNullable()
      table.string('description').nullable()
      table.integer('max_capacity').notNullable()
      table.boolean('animation').notNullable()
      table.string('festival_id').references('id').inTable('festivals')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
