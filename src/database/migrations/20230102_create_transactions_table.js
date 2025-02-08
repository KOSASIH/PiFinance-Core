// Migration script to create transactions table

exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary(); // Primary key
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); // Foreign key
        table.decimal('amount', 14, 2).notNullable(); // Transaction amount
        table.string('transaction_type').notNullable(); // Type of transaction (e.g., deposit, withdrawal)
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transactions'); // Rollback function
};
