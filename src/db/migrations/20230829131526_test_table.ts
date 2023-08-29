import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('test', function(table) {
        table.increments('id').primary();
        table.string('name');
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists('test')
}

