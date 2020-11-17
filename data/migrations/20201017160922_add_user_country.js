exports.up = function(knex) {
    return knex.schema.createTable('user_country', table =>{
      table.increments('id');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      table.string('country').notNullable().index()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_country')
  };