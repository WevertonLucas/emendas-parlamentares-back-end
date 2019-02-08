module.exports = function(app) {
    let api = {};

    //Lista todas as Fontes.
    api.getFonte = (req, res) => {
        const connection = app.conexao.conexao();
        const fonteDAO = new app.infra.FonteDAO(connection);

        fonteDAO.getFonte((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as fontes')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}