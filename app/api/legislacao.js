module.exports = function(app){
    let api = {};

    //Lista todas as Legislações.
    api.getLegislacao = (req, res) => {
        const connection = app.conexao.conexao();
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection);

        legislacaoDAO.getLegislacao((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter as legislações.')) : res.status(200).json(resultado);
        });

        connection.end();
    }

    //Lista uma Legislação com base no ID (ano).
    api.getLegislacaoById = (req, res) => {
        let { ano } = req.params;

        const connection = app.conexao.conexao();
        const legislacaoDAO = new app.infra.LegislacaoDAO(connection);

        legislacaoDAO.getLegislacaoById(ano, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter a legislação com ID: ${ano}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end();
    }

    //Salva uma nova Legislação.
    api.postLegislacao = (req, res) => {
        let legislacao = req.body;
        
    	const knex = app.conexao.conexaoKnex();

        knex('legislacao').insert(legislacao)
            .then(resultado => {
                knex.destroy();
                res.status(201).json(resultado[0]);
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                if(erro.errno == 1062){
                    res.status(500).send(`A legislação do ano ${legislacao.ano} já está cadastrada.`);
                } else {
                    res.status(500).send('Erro ao cadastrar a legislação.');
                }
            });
    };

    //Atualiza uma Legislação.
    api.putLegislacao = (req, res) => {
        const { ano } = req.params;
        let legislacao = req.body;
        
        const knex = app.conexao.conexaoKnex();

        knex('legislacao').update(legislacao).where('ano', ano)
            .then(resultado => {
                knex.destroy();
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send('Erro ao atualizar a legislação.');
            });        
    }

    //Apaga uma Legislação.
    api.deleteLegislacao = (req, res) => {
        const { ano } = req.params;
        
        const knex = app.conexao.conexaoKnex();

        knex('legislacao').where('ano', ano).delete()
            .then(resultado => {
                knex.destroy();
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                if(erro.errno == 1451){
                    res.status(500).send('Esta legislação já está vinculada a uma emenda, por isso não pode ser apagada.');
                } else {
                    res.status(500).send('Erro ao apagar a legislação.');
                }
            });        
    }

    return api;
}