module.exports = function(app){
    //Objeto de callbacks de Emenda.
    let api = {};

    //Método que lista todas as Emendas.
    api.getEmenda = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const emendaDAO = new app.infra.EmendaDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        emendaDAO.getEmenda((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as emendas.')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que lista uma Emenda com base no ID (cod_emenda).
    api.getEmendaById = (req, res) => {
        let { cod_emenda } = req.params; //Recebe o cod_emenda.
        
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const emendaDAO = new app.infra.EmendaDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.
        
         /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        emendaDAO.getEmendaById(cod_emenda, (erro, resultado) => {
            if(erro){
                console.log(erro);
                res.status(500).send(`Erro ao obter a emenda com ID: ${cod_emenda}.`);
            } else {
                //Caso a Emenda tenha projetos, este será enviado como um array.
                if(resultado[0].cod_projeto)
                resultado[0].cod_projeto = resultado[0].cod_projeto.split(",")

                res.status(200).json(resultado[0])
            }
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que salvar uma nova Emenda.
    api.postEmenda = (req, res) => {
        let emenda = req.body; //Recebe as informações da Emenda.
        let { projeto } = req.body; //Recebe os projetos da Emenda
        
        //Apaga alguns dados que não são necessários.
        delete emenda.uf;
        delete emenda.projeto;
        
    	const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Salva as informações da nova Emenda.
            Se o cadastro der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('emenda').insert(emenda)
            .then(resultadoEmenda => {
                let emenda_projeto = [];

                //Se a Emenda tiver projetos será feito uma estrutura para salvar estes projetos no banco de dados.
                if(Array.isArray(projeto)){
                    for(let i = 0; i<projeto.length; i++){
                        emenda_projeto[i] = { cod_emenda: resultadoEmenda[0], cod_projeto: projeto[i] };
                    }
                }

                //Salva os projetos da Emenda.
                return knex('emenda_projeto').insert(emenda_projeto)
                    .then(resultadoEmendaProjeto => {
                        knex.destroy(); //Fecha a conexão do Knex.
                        res.status(201).json(resultadoEmenda[0]);
                    })
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(500).send('Erro ao cadastrar a emenda.');
            });
    };

    //Método para atualizar uma Emenda.
    api.putEmenda = (req, res) => {
        const { cod_emenda } = req.params; //Recebe o cod_emenda que deverá ser atualizado.
        let emenda = req.body; //Recebe as informações da Emenda.
        let { projeto } = req.body; //Recebe os projetos da Emenda

        //Apaga alguns dados que não são necessários.
        delete emenda.uf;
        delete emenda.projeto;
        
        const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Atualiza as informáções de uma Emenda com base no cod_emenda passado.
            Se a atualização der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('emenda').update(emenda).where('cod_emenda', cod_emenda)
            .then(resultadoUpdate => {
                //Apaga todos os projetos existentes da Emenda.
                knex('emenda_projeto').where('cod_emenda', cod_emenda).delete()
                    .then(resultadoDelete => {
                        let emenda_projeto = [];

                        //Se a Emenda tiver projetos será feito uma estrutura para salvar estes projetos no banco de dados.
                        if(Array.isArray(projeto)){
                            for(let i = 0; i<projeto.length; i++){
                                emenda_projeto[i] = { cod_emenda, cod_projeto: projeto[i] };
                            }
                        }

                        //Salva novamente os projetos da Emenda.
                        return knex('emenda_projeto').insert(emenda_projeto)
                            .then(resultadoEmendaProjeto => {
                                knex.destroy(); //Fecha a conexão do Knex.
                                res.status(200).end();
                            })
                    })

            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(500).send('Erro ao atualizar a emenda.');
            });        
    }


    return api;
}