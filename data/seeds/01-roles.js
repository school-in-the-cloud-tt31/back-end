exports.seed = function(knex) {
    return knex('roles').insert([
      { id: 1, role: 'student' },
      { id: 2, role: 'admin' },
      { id: 3, role: 'volunteer' },
      ]);
  };