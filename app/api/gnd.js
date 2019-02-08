module.exports = function(app) {
    let api = {};

    //Lista todos os Gnd.
    api.getGnd = (req, res) => {
        const connection = app.conexao.conexao();
        const gndDAO = new app.infra.GndDAO(connection);

        gndDAO.getGnd((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os gnd')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}