module.exports = function(app) {
    //Objeto de callbacks de Programas de Governo.
    let api = {};

    //Método que lista todos os Programas de Governo.
    api.getProgramaGoverno = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const programaGovernoDAO = new app.infra.ProgramaGovernoDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        programaGovernoDAO.getProgramaGoverno((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os programas de governo.')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    return api;
}