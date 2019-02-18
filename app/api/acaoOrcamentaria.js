module.exports = function(app) {
    let api = {};

    //Lista todas as Ações Orçamentárias
    api.getAcaoOrcamentaria = (req, res) => {
        const connection = app.conexao.conexao();
        const acaoOrcamentariaDAO = new app.infra.AcaoOrcamentariaDAO(connection);

        acaoOrcamentariaDAO.getAcaoOrcamentaria((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as ações orçamentárias.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}