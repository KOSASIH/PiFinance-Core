// Migration script to create users table

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('username').notNullable().unique(); // Unique username
        table.string('email').notNullable().unique(); // Unique email
        table.string('password').notNullable(); // User password
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Rollback function
};
