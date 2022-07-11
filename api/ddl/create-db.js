exports.down = (knex, Promise) => {
    return knex.schema.dropTable('first');
};