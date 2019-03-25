module.exports = function(app) {
    //Objeto de callbacks de Autor.
    let api = {};

    //Método que lista todos os Autores.
    api.getAutor = (req, res) => {
        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const autorDAO = new app.infra.AutorDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        autorDAO.getAutor((erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send('Erro ao obter os autores.')) : res.status(200).json(resultado);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método que lista um Autor com base no ID (cod_autor), que é recebido no parâmetro da rota.
    api.getAutorById = (req, res) => {
        let { cod_autor } = req.params; //Recebe o cod_autor.

        const connection = app.conexao.conexao(); //Cria uma conexão com o banco de dados.
        const autorDAO = new app.infra.AutorDAO(connection); //Instância o objeto de acesso a dados, passando a conexão como parâmetro.

        /* Chama o método que faz a pesquisa no banco de dados.
            Se algo der errado será recebido no parâmetro erro, caso contrário os resultados estaram
            no parâmetro resultado, que é um array de objetos, onde cada objeto representa uma tupla
            da pesquisa.
        */
        autorDAO.getAutorById(cod_autor, (erro, resultado) => {
            erro ? (console.log(erro), res.status(500).send(`Erro ao obter o autor com ID: ${cod_autor}.`)) : res.status(200).json(resultado[0]);
        });

        connection.end(); //Fecha a conexão com o banco de dados.
    }

    //Método para salvar um novo Autor.
    api.postAutor = (req, res) => {
        let autor = req.body; //Recebe as informações do Autor.
        
    	const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Salva as informações do novo Autor.
            Se o cadastro der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('autor').insert(autor)
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(201).json(resultado[0]);
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(500).send('Erro ao cadastrar o autor.');
            });
    };

    //Método para atualizar um Autor.
    api.putAutor = (req, res) => {
        const { cod_autor } = req.params; //Recebe o cod_autor que deverá ser atualizado.
        let autor = req.body; //Recebe as informações do autor.

        const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Atualiza as informações de um Autor com base no cod_autor passado.
            Se a atualização der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('autor').update(autor).where('cod_autor', cod_autor)
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(500).send('Erro ao atualizar o autor.');
            });        
    }

    //Método para apaga um Autor.
    api.deleteAutor = (req, res) => {
        const { cod_autor } = req.params; //Recebe o cod_autor que deverá ser apagado.
        
        const knex = app.conexao.conexaoKnex(); //Cria uma conexão com o banco de dados utilizando o Knex.

        /* Apaga as informáções de um Autor com base no cod_autor passado.
            Se a deleção der certo o código dentro do .then() será executado,
            caso contrário será executado o código do .catch()
        */
        knex('autor').where('cod_autor', cod_autor).delete()
            .then(resultado => {
                knex.destroy(); //Fecha a conexão do Knex.
                res.status(200).end();
            })
            .catch(erro => {
                console.log(erro);
                knex.destroy(); //Fecha a conexão do Knex.
                if(erro.errno == 1451){
                    res.status(500).send('Este autor já está vinculada a uma emenda, por isso não pode ser apagada.');
                } else {
                    res.status(500).send('Erro ao apagar o autor.');
                }
            });        
    }

    return api;
}