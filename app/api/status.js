module.exports = function(app) {
    let api = {};

    //Lista todos os Status.
    api.getStatus = (req, res) => {
        const connection = app.conexao.conexao();
        const statusDAO = new app.infra.StatusDAO(connection);

        statusDAO.getStatus((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os status.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}