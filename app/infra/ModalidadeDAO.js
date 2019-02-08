class ModalidadeDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Modalidades.
    getModalidade(callback) {
        this._connection.query(`SELECT * FROM modalidade`, callback);
    }

}

module.exports = () => {
	return ModalidadeDAO;
};