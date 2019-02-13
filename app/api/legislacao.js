module.exports = function(app){
    let api = {};

    api.getLegislacao = (req, res) => {
        const connection = app.conexao.conexao();
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection);

        legislacaoDAO.getLegislacao((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as legislações.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    api.getLegislacaoById = (req, res) => {
        let { ano } = req.params;

        const connection = app.conexao.conexao();
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection);

        legislacaoDAO.getLegislacaoById(ano, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter legislação com ID: ${ano}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end();
    }

    return api;
}