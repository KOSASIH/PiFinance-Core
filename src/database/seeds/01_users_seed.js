// Seed script to populate the users table

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { username: 'john_doe', email: 'john@example.com', password: 'Password123!' },
                { username: 'jane_smith', email: 'jane@example.com', password: 'Password123!' },
                { username: 'alice_jones', email: 'alice@example.com', password: 'Password123!' },
            ]);
        });
};
