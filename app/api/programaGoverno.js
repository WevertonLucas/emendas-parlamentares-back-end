module.exports = function(app) {
    let api = {};

    //Lista todos os Programas de Governo.
    api.getProgramaGoverno = (req, res) => {
        const connection = app.conexao.conexao();
        const programaGovernoDAO = new app.infra.ProgramaGovernoDAO(connection);

        programaGovernoDAO.getProgramaGoverno((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os programas de governo.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    return api;
}