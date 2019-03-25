//Carrega o módulo HTTP e algumas configurações do servidor.
const http = require('http')
    ,app = require('./config/express');

//Cria o servidor
http.createServer(app).listen(3000, function() {
    console.log('Servidor rodando na porta: ' + this.address().port)
});