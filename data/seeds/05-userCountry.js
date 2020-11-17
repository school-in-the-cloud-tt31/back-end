exports.seed = function(knex) {
    return knex('user_country').insert([
      { id:1 , user_id: 3 , country: 'United States'},
      ]);
  };