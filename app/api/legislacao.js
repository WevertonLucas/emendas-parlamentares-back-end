module.exports = function(app){
    //Objeto de callbacks de Legislação.
    let api = {};

    //Método que lista todas as Legislações.
    api.getLegislacao = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        legislacaoDAO.getLegislacao((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as legislações.')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que lista uma Legislação com base no ID (ano), que é recebido no parâmetro da rota.
    api.getLegislacaoById = (req, res) => {
        let { ano } = req.params; //Recebe o ano.

        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        legislacaoDAO.getLegislacaoById(ano, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter a legislação com ID: ${ano}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que salva uma nova Legislação.
    api.postLegislacao = (req, res) => {
        let legislacao = req.body; //Recebe as informações da Legislação.
        
    	const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Salva as informações da nova Legislação.
            Se o cadastro der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('legislacao').insert(legislacao)
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(201).json(resultado[0]);
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                if(erro.errno == 1062){
                    res.status(500).send(`A legislação do ano ${legislacao.ano} já está cadastrada.`);
                } else {
                    res.status(500).send('Erro ao cadastrar a legislação.');
                }
            });
    };

    //Método que atualiza uma Legislação.
    api.putLegislacao = (req, res) => {
        const { ano } = req.params; //Recebe o ano que deverá ser atualizado.
        let legislacao = req.body; //Recebe as informações da Legislação.
        
        const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Atualiza as informações de uma Legislação com base no ano passado.
            Se a atualização der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('legislacao').update(legislacao).where('ano', ano)
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(500).send('Erro ao atualizar a legislação.');
            });        
    }

    //Método que apaga uma Legislação.
    api.deleteLegislacao = (req, res) => {
        const { ano } = req.params; //Recebe o ano que deverá ser apagado.
        
        const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Apaga as informáções de uma Legislação com base no ano passado.
            Se a deleção der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('legislacao').where('ano', ano).delete()
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                if(erro.errno == 1451){
                    res.status(500).send('Esta legislação já está vinculada a uma emenda, por isso não pode ser apagada.');
                } else {
                    res.status(500).send('Erro ao apagar a legislação.');
                }
            });        
    }

    return api;
}