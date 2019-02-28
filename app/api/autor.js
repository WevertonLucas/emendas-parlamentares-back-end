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

    //Salva um novo Autor.
    api.postAutor = (req, res) => {
        let autor = req.body;
        
    	const knex = app.conexao.conexaoKnex();

        knex('autor').insert(autor)
            .then(resultado => {
                knex.destroy();
                res.status(201).json(resultado[0]);
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send('Erro ao cadastrar o autor.');
            });
    };

    //Atualiza um Autor.
    api.putAutor = (req, res) => {
        const { cod_autor } = req.params;
        let autor = req.body;

        const knex = app.conexao.conexaoKnex();

        knex('autor').update(autor).where('cod_autor', cod_autor)
            .then(resultado => {
                knex.destroy();
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send('Erro ao atualizar o autor.');
            });        
    }

    //Apaga um Autor.
    api.deleteAutor = (req, res) => {
        const { cod_autor } = req.params;
        
        const knex = app.conexao.conexaoKnex();

        knex('autor').where('cod_autor', cod_autor).delete()
            .then(resultado => {
                knex.destroy();
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                if(erro.errno == 1451){
                    res.status(500).send('Este autor já está vinculada a uma emenda, por isso não pode ser apagada.');
                } else {
                    res.status(500).send('Erro ao apagar o autor.');
                }
            });        
    }

    return api;
}