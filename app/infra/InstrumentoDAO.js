//Classe de acesso a dados para Instrumento.
class InstrumentoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Instrumentos.
    getInstrumento(callback) {
        this._connection.query(`SELECT * FROM instrumento`, callback);
    }

}

module.exports = () => {
	return InstrumentoDAO;
};