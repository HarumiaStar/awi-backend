import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'assignments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('volunteer_id').references('id').inTable('volunteers').unique().notNullable()
      table.string('zone_id').references('id').inTable('zones').notNullable()
      table.string('slot_id').references('id').inTable('slots').notNullable()
      table.boolean('is_referent').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
