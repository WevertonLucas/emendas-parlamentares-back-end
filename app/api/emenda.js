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
            if(erro){
                console.log(erro);
                res.status(500).send(`Erro ao obter a emenda com ID: ${cod_emenda}.`);
            } else {
                if(resultado[0].cod_projeto)
                resultado[0].cod_projeto = resultado[0].cod_projeto.split(",")

                res.status(200).json(resultado[0])
            }
        });

        connection.end();
    }

    //Salva uma nova Emenda.
    api.postEmenda = (req, res) => {
        let emenda = req.body;
        let { projeto } = req.body;
        
        delete emenda.uf;
        delete emenda.projeto;
        
    	const knex = app.conexao.conexaoKnex();

        knex('emenda').insert(emenda)
            .then(resultadoEmenda => {
                let emenda_projeto = [];

                if(Array.isArray(projeto)){
                    for(let i = 0; i<projeto.length; i++){
                        emenda_projeto[i] = { cod_emenda: resultadoEmenda[0], cod_projeto: projeto[i] };
                    }
                }

                return knex('emenda_projeto').insert(emenda_projeto)
                    .then(resultadoEmendaProjeto => {
                        knex.destroy();
                        res.status(201).json(resultadoEmenda[0]);
                    })
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send('Erro ao cadastrar a emenda.');
            });
    };

    api.putEmenda = (req, res) => {
        const { cod_emenda } = req.params;
        let emenda = req.body;
        let { projeto } = req.body;

        delete emenda.uf;
        delete emenda.projeto;
        
        const knex = app.conexao.conexaoKnex();

        knex('emenda').update(emenda).where('cod_emenda', cod_emenda)
            .then(resultadoUpdate => {
                knex('emenda_projeto').where('cod_emenda', cod_emenda).delete()
                    .then(resultadoDelete => {
                        let emenda_projeto = [];

                        if(Array.isArray(projeto)){
                            for(let i = 0; i<projeto.length; i++){
                                emenda_projeto[i] = { cod_emenda, cod_projeto: projeto[i] };
                            }
                        }

                        return knex('emenda_projeto').insert(emenda_projeto)
                            .then(resultadoEmendaProjeto => {
                                knex.destroy();
                                res.status(200).end();
                            })
                    })

            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send('Erro ao atualizar a emenda.');
            });        
    }


    return api;
}