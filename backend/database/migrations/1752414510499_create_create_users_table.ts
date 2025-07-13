import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.string('username').notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('password').notNullable();
      table.string('reset_password_token').nullable();
      table.timestamp('reset_password_expires_at').nullable();
      table.string('remember_me_token').nullable();
      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
