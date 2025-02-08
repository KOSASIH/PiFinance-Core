// Seed script to populate the transactions table

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('transactions').del()
        .then(function() {
            // Inserts seed entries
            return knex('transactions').insert([
                { user_id: 1, amount: 100.00, transaction_type: 'deposit' },
                { user_id: 1, amount: 50.00, transaction_type: 'withdrawal' },
                { user_id: 2, amount: 200.00, transaction_type: 'deposit' },
                { user_id: 3, amount: 150.00, transaction_type: 'deposit' },
                { user_id: 3, amount: 75.00, transaction_type: 'withdrawal' },
            ]);
        });
};
