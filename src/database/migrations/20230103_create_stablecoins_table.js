// Migration script to create stablecoins table

exports.up = function(knex) {
    return knex.schema.createTable('stablecoins', (table) => {
        table.increments('id').primary(); // Primary key
        table.string('name').notNullable(); // Name of the stablecoin
        table.string('symbol').notNullable(); // Symbol of the stablecoin
        table.decimal('value', 14, 2).notNullable(); // Current value of the stablecoin
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('stablecoins'); // Rollback function
};
