exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.increments('id');
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('name').notNullable();
  })
  .createTable('roles', table =>{
    table.increments('id');
    table.string('role').notNullable().unique()
  })
  .createTable('user_roles', table =>{
    table.increments('id')
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id');
    table.integer('role_id')
      .unsigned()
      .notNullable()
      .references('roles.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_roles')
    .dropTableIfExists('roles')
    .dropTableIfExists('users')
};