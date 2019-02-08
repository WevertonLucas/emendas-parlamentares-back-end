class AcaoOrcamentariaDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Ações Orçamentárias.
    getAcaoOrcamentaria(callback) {
        this._connection.query(`SELECT * FROM acao_orcamentaria`, callback);
    }

}

module.exports = () => {
	return AcaoOrcamentariaDAO;
};