exports.up = function(knex) {
    return knex.schema.createTable('availability', table =>{
      table.increments('id');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      table.string('day').notNullable()
      table.time('time_start').notNullable()
      table.time('time_end').notNullable()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('availability')
  };