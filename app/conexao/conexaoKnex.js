//Carrega o modulo do knex.
var knex = require('knex');

//Cria conexão com o Banco de Dados MySql.
var connectKnex = function(){
    return knex({
        client: 'mysql',
        connection: {
            host : 'localhost',
            user : '',
            password : '',
            database : 'emenda_db'
        }
    });
}

//Retorna a conexão.
module.exports = function(){
	return connectKnex;
};