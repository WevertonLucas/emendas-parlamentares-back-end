//Classe de acesso a dados para Autor.
class AutorDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Autores.
    getAutor(callback) {
        this._connection.query(`SELECT * FROM autor`, callback);
    }

    //Lista um Autor com base no ID (cod_autor) que é passado como parâmetro.
    getAutorById(cod_autor, callback) {
        this._connection.query(`SELECT * FROM autor WHERE cod_autor = ${cod_autor}`, callback);
    }
}

module.exports = () => {
	return AutorDAO;
};