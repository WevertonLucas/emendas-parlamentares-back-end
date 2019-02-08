class GndDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Gnd.
    getGnd(callback) {
        this._connection.query(`SELECT * FROM gnd`, callback);
    }

}

module.exports = () => {
	return GndDAO;
};