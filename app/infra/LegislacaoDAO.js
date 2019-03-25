//Classe de acesso a dados para Legislação.
class LegislacaoDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Legislações.
    getLegislacao(callback) {
        this._connection.query(`SELECT * FROM legislacao ORDER BY ano DESC`, callback);
    }

    //Lista uma Legislações com base no ID (ano) que é passado como parâmetro.
    getLegislacaoById(ano, callback) {
        this._connection.query(`SELECT * FROM legislacao WHERE ano = ${ano}`, callback);
    }
}

module.exports = () => {
	return LegislacaoDAO;
};