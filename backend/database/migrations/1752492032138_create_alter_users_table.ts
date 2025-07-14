import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('email_verification_token').nullable();
      table.timestamp('email_verification_expires_at', { useTz: true }).nullable();
      table.boolean('email_verified').defaultTo(false);
    });
  }

  public async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('email_verification_token');
      table.dropColumn('email_verification_expires_at');
      table.dropColumn('email_verified');
    });
  }
}
