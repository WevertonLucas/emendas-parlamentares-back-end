module.exports = function(app) {
    //Objeto de callbacks de Municipio.
    let api = {};

    //Método que lista todas as Ufs.
    api.getUf = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const municipioDAO = new app.infra.MunicipioDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        municipioDAO.getUf((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as ufs.')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que lista os Municípios de uma Uf.
    api.getMunicipioByUf = (req, res) => {
        let { uf } = req.params; //Recebe a uf que será utilizada na busca.

        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const municipioDAO = new app.infra.MunicipioDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        municipioDAO.getMunicipioByUf(uf, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter os municípios da uf: ${uf}`)) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    return api;
}