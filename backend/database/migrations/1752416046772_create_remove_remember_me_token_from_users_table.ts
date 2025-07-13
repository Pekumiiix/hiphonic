import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('remember_me_token');
    });
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.string('remember_me_token').nullable();
    });
  }
}
