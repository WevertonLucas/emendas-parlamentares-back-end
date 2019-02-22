class EmendaDAO {
    constructor(connection) {
        this._connection = connection;
    }

    //Lista todas as Emendas.
    getEmenda(callback) {
        this._connection.query(
            `SELECT emenda.cod_emenda, emenda.ano, emenda.num_emenda, emenda.beneficiario, emenda.valor_emenda, autor.*, status.descricao AS status
            FROM emenda
            INNER JOIN autor ON emenda.cod_autor = autor.cod_autor
            LEFT JOIN status ON emenda.cod_status = status.cod_status
            ORDER BY num_emenda`, callback);
    }

    //Lista todas as Emendas.
    getEmendaByNumEmenda(num_emenda, callback) {
        this._connection.query(
            `SELECT emenda.cod_emenda, emenda.ano, emenda.num_emenda, emenda.beneficiario, emenda.valor_emenda, autor.*, status.descricao AS status
            FROM emenda
            INNER JOIN autor ON emenda.cod_autor = autor.cod_autor
            LEFT JOIN status ON emenda.cod_status = status.cod_status
            WHERE emenda.num_emenda LIKE '%${num_emenda}%'
            ORDER BY num_emenda`, callback);
    }

    //Lista uma Emenda com base no ID (cod_emenda).
    getEmendaById(cod_emenda, callback) {
        this._connection.query(
            `SELECT *, legislacao.descricao AS descricaoLegislacao, fonte.descricao AS fonte, gnd.descricao AS gnd, modalidade.descricao AS modalidade,
            programa_governo.descricao AS programa_governo, acao_orcamentaria.descricao AS acao_orcamentaria,
            status.descricao AS status, instrumento.descricao AS instrumento, CASE WHEN emenda.impedimento = "1" THEN "Sim" WHEN emenda.impedimento = "0" THEN "Não" END AS "impedimento",
            group_concat(projeto.descricao) AS projeto, group_concat(projeto.cod_projeto) AS cod_projeto
            FROM emenda
            INNER JOIN legislacao ON emenda.ano = legislacao.ano
            LEFT JOIN municipio ON emenda.cod_ibge = municipio.cod_ibge
            INNER JOIN autor ON emenda.cod_autor = autor.cod_autor
            INNER JOIN fonte ON emenda.cod_fonte = fonte.cod_fonte
            INNER JOIN gnd ON emenda.cod_gnd = gnd.cod_gnd
            INNER JOIN modalidade ON emenda.cod_modalidade = modalidade.cod_modalidade
            INNER JOIN programa_governo ON emenda.cod_programa_governo = programa_governo.cod_programa_governo
            INNER JOIN acao_orcamentaria ON emenda.cod_acao_orcamentaria = acao_orcamentaria.cod_acao_orcamentaria
            LEFT JOIN status ON emenda.cod_status = status.cod_status
            LEFT JOIN instrumento ON emenda.cod_instrumento = instrumento.cod_instrumento
            INNER JOIN emenda_projeto ON emenda.cod_emenda = emenda_projeto.cod_emenda
            INNER JOIN projeto ON emenda_projeto.cod_projeto = projeto.cod_projeto
            WHERE emenda.cod_emenda = ${cod_emenda}`, callback);
        }
}


module.exports = () => {
	return EmendaDAO;
};