class ProjetoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Projetos.
    getProjeto(callback) {
        this._connection.query(`SELECT * FROM projeto`, callback);
    }

}

module.exports = () => {
	return ProjetoDAO;
};