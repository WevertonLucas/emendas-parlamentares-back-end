//Classe de acesso a dados para Município.
class MunicipioDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Ufs.
    getUf(callback) {
        this._connection.query(`SELECT DISTINCT(uf) FROM municipio ORDER BY uf`, callback);
    }
    
    //Lista os Municípios de uma Uf que é passada como parâmetro.
    getMunicipioByUf(uf, callback) {
        this._connection.query(`SELECT cod_ibge, nome_municipio FROM municipio WHERE uf = '${uf}'`, callback);
    }
    
}

module.exports = () => {
	return MunicipioDAO;
};