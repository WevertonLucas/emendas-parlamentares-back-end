//Carrega os módulos necessários para o servidor.
const app = require('express')()
    ,consign = require('consign')
    ,bodyParser = require('body-parser')
    ,cors = require('cors');

//Configuração do Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Configuração do BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Carregamento dos módulos do projeto pelo Consign
consign({cwd : 'app'})
    .include('conexao')
    .then('infra')
    .then('api')
	.then('routes')
    .into(app);

module.exports = app;