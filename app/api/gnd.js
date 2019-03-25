module.exports = function(app) {
    //Objeto de callbacks de Gnd.
    let api = {};

    //Método que lista todos os Gnd.
    api.getGnd = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const gndDAO = new app.infra.GndDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        gndDAO.getGnd((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os gnd')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    return api;
}