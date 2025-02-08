// Migration script to add indexes

exports.up = function(knex) {
    return Promise.all([
        knex.schema.table('users', (table) => {
            table.index('username'); // Add index to username
        }),
        knex.schema.table('transactions', (table) => {
            table.index('user_id'); // Add index to user_id
        }),
    ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.table('users', (table) => {
            table.dropIndex('username'); // Remove index from username
        }),
        knex.schema.table('transactions', (table) => {
            table.dropIndex('user_id'); // Remove index from user_id
        }),
    ]);
};
