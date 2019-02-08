module.exports = function(app) {
    let api = {};

    //Lista todas as Modalidades.
    api.getModalidade = (req, res) => {
        const connection = app.conexao.conexao();
        const modalidadeDAO = new app.infra.ModalidadeDAO(connection);

        modalidadeDAO.getModalidade((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as modalidades')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}