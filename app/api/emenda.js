module.exports = function(app){
    let api = {};

    //Lista todas as Emendas.
    api.getEmenda = (req, res) => {
        const connection = app.conexao.conexao();
        const emendaDAO = new app.infra.EmendaDAO(connection);

        emendaDAO.getEmenda((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as emendas.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    //Lista uma Emenda com base no ID (cod_emenda).
    api.getEmendaById = (req, res) => {
        let { cod_emenda } = req.params;
        
        const connection = app.conexao.conexao();
        const emendaDAO = new app.infra.EmendaDAO(connection);
        
        emendaDAO.getEmendaById(cod_emenda, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter a emenda com ID: ${cod_emenda}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end();
    }

    return api;
}