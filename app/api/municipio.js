module.exports = function(app) {
    let api = {};

    //Lista todas as Ufs.
    api.getUf = (req, res) => {
        const connection = app.conexao.conexao();
        const municipioDAO = new app.infra.MunicipioDAO(connection);

        municipioDAO.getUf((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as ufs.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    //Lista os Municípios de uma Uf.
    api.getMunicipioByUf = (req, res) => {
        let { uf } = req.params;

        const connection = app.conexao.conexao();
        const municipioDAO = new app.infra.MunicipioDAO(connection);

        municipioDAO.getMunicipioByUf(uf, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter os municípios da uf: ${uf}`)) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}