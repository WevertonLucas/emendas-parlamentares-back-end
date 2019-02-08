class AutorDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Autores.
    getAutor(callback) {
        this._connection.query(`SELECT * FROM autor`, callback);
    }

    //Lista um Autor com base no ID (cod_autor).
    getAutorById(cod_autor, callback) {
        this._connection.query(`SELECT * FROM autor WHERE cod_autor = ${cod_autor}`, callback);
    }
}

module.exports = () => {
	return AutorDAO;
};