class ProgramaGovernoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todos os Programas de Governo.
    getProgramaGoverno(callback) {
        this._connection.query(`SELECT * FROM programa_governo`, callback);
    }

}

module.exports = () => {
	return ProgramaGovernoDAO;
};