module.exports = function(app) {
    let api = {};

    //Lista todos os Autores.
    api.getAutor = (req, res) => {
        const connection = app.conexao.conexao();
        const autorDAO = new app.infra.AutorDAO(connection);

        autorDAO.getAutor((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os autores.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    //Lista um Autor com base no ID (cod_autor).
    api.getAutorById = (req, res) => {
        let { cod_autor } = req.params;

        const connection = app.conexao.conexao();
        const autorDAO = new app.infra.AutorDAO(connection);

        autorDAO.getAutorById(cod_autor, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter o autor com ID: ${cod_autor}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end();
    }

    return api;
}