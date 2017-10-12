
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'timetable',
        charset  : 'utf8'
    }
});
var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin( 'registry' );

module.exports.bookshelf = Bookshelf;