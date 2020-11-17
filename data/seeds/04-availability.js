exports.seed = function(knex) {
    return knex('availability').insert([
      { id:1 , user_id: 3 , day: 'monday', time_start:'4:00', time_end:'6:00'},
      { id:2 , user_id: 3 , day: 'tuesday', time_start:'12:00', time_end:'1:00'},
      { id:3 , user_id: 3 , day: 'monday', time_start:'8:00', time_end:'12:00'},
      { id:4 , user_id: 3 , day: 'thursday', time_start:'6:00', time_end:'8:00'},
      ]);
  };