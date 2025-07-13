import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'remember_me_tokens';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('tokenable_id').unsigned().notNullable().alter();
      table.foreign('tokenable_id').references('users.id').onDelete('CASCADE').alter();
      table.string('hash').notNullable().unique().alter();
      table.timestamp('created_at').notNullable().alter();
      table.timestamp('updated_at').notNullable().alter();
      table.timestamp('expires_at').notNullable().alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Rollback changes as needed (example: make columns nullable again, drop unique, etc.)
      table.integer('tokenable_id').notNullable().alter();
      table.dropForeign(['tokenable_id']);
      table.string('hash').notNullable().alter();
      table.dropUnique(['hash']);
      table.timestamp('created_at').nullable().alter();
      table.timestamp('updated_at').nullable().alter();
      table.timestamp('expires_at').nullable().alter();
    });
  }
}
