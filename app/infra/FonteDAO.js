class FonteDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Fontes.
    getFonte(callback) {
        this._connection.query(`SELECT * FROM fonte`, callback);
    }
    
}

module.exports = () => {
	return FonteDAO;
};