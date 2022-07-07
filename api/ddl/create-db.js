const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'william_slauson',
        password: 'konatera',
        database: 'william_slauson'
    }
});
//boilerplate from knex manual
async function buildTable(tableName) {
    try {
        newTable = await knex.schema.createTable(tableName, function (table) {
            table.increments();
            table.string('name');
            table.timestamps();
          })
        console.log(newTable)
    }
    catch(err) {
        console.log(`Oops: ${err}`);
        knex.destroy();
    }
}

async function destroyTable(tableName) {
    try {
        await knex.schema.dropTableIfExists(tableName);
        console.log(`${tableName} dropped!`);
    }
    catch(err) {
        console.log(`Failed to drop table: ${err}`);
        knex.destroy();
    }
}

async function doStuff() {
    try {
        await buildTable('second');
        await destroyTable('second');
    }
    catch(err) {
        console.log(`Oops: ${err}`);
        knex.destroy();
    }
}

doStuff();

knex.destroy();