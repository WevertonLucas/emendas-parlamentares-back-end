class StatusDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Status.
    getStatus(callback) {
        this._connection.query(`SELECT * FROM status`, callback);
    }

}

module.exports = () => {
	return StatusDAO;
};