// Seed script to populate the stablecoins table

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('stablecoins').del()
        .then(function() {
            // Inserts seed entries
            return knex('stablecoins').insert([
                { name: 'PiCoin', symbol: 'PI', value: 314159.00 },
                { name: 'Tether', symbol: 'USDT', value: 1.00 },
                { name: 'USD Coin', symbol: 'USDC', value: 1.00 },
            ]);
        });
};
