module.exports = function(app) {
    //Objeto de callbacks de Modalidade.
    let api = {};

    //Método que lista todas as Modalidades.
    api.getModalidade = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const modalidadeDAO = new app.infra.ModalidadeDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        modalidadeDAO.getModalidade((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as modalidades')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    return api;
}