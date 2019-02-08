module.exports = function(app) {
    let api = {};

    //Lista todos os Instrumentos.
    api.getInstrumento = (req, res) => {
        const connection = app.conexao.conexao();
        const instrumentoDAO = new app.infra.InstrumentoDAO(connection);

        instrumentoDAO.getInstrumento((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os Instrumentos.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}