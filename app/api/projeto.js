module.exports = function(app) {
    let api = {};

    //Lista todos os Projetos.
    api.getProjeto = (req, res) => {
        const connection = app.conexao.conexao();
        const projetoDAO = new app.infra.ProjetoDAO(connection);

        projetoDAO.getProjeto((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os projetos.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}