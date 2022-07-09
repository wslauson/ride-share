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
        await knex.schema.createTable(tableName, (table) => {
            table.increments();
            table.string('name');
            table.timestamps();
          });
        console.log(`table ${tableName} created`);
       
    }
    catch(err) {
        console.log(`Oops, no table: ${err}`); 
    }
}

async function destroyTable(tableName) {
    try {
        await knex.schema.dropTableIfExists(tableName);
        console.log(`table ${tableName} dropped!`);
    }
    catch(err) {
        console.log(`Failed to drop table: ${err}`);
    }
}

async function doStuff() {
    try {
        let result = await buildTable('second');
        if (result !== undefined) {
            await destroyTable('second');
        }
    }
    catch(err) {
        console.log(`Oops: ${err}`);
        await knex.destroy();
    }
}

doStuff();

knex.destroy();