exports.up = function(knex) {
    return knex.schema.createTable('tasks', table =>{
      table.increments('id')
      table.integer('volunteer_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
      table.text('description').notNullable()
      table.boolean('completed').defaultTo(false)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks')
  };