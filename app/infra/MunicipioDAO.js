class MunicipioDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Ufs.
    getUf(callback) {
        this._connection.query(`SELECT DISTINCT(uf) FROM municipio ORDER BY uf`, callback);
    }
    
    //Lista os Municípios de uma Uf.
    getMunicipioByUf(uf, callback) {
        this._connection.query(`SELECT nome_municipio FROM municipio WHERE uf = '${uf}'`, callback);
    }
    
}

module.exports = () => {
	return MunicipioDAO;
};