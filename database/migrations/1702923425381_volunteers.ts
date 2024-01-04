import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'volunteers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').unique().notNullable()
      table.enum('tshirt_size', ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']).notNullable()
      table.bigint('nb_edition_performed').notNullable()
      table.enum('lodging', ['propisition', 'recherche', 'aucun']).notNullable() // Lodging => Hébergement
      table.string('address').nullable()
      table.string('phone', 10).nullable()
      table.string('username').nullable()
      table.string('avatar_url').nullable()
      table.enum('food_regime', ['vegetarien', 'carnivore', 'autre']).notNullable()
      table.boolean('is_admin').notNullable()
      table.boolean('is_present').notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
