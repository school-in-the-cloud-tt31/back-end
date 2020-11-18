const bcrypt = require('bcrypt')

exports.seed = function(knex) {
  return knex('users').insert([
    { id: 1, email: 'student@email.com', password: bcrypt.hashSync('test123', 8), name:'student'},
    { id: 2, email: 'admin@email.com', password: bcrypt.hashSync('test123', 8), name:'admin' },
    { id: 3, email: 'volunteer@email.com', password: bcrypt.hashSync('test123', 8), name:'volunteer'},
    ]);
};