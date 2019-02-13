module.exports = function(app){

    let acaoOrcamentaria = app.api.acaoOrcamentaria;
    let autor = app.api.autor;
    let emenda = app.api.emenda;
    let fonte = app.api.fonte;
    let gnd = app.api.gnd;
    let instrumento = app.api.instrumento;
    let legislacao = app.api.legislacao;
    let modalidade = app.api.modalidade;
    let municipio = app.api.municipio;
    let programaGoverno = app.api.programaGoverno;
    let projeto = app.api.projeto;
    let status = app.api.status;

/* ===== Rotas de Acao ===== */
    app.route('/acoesOrcamentaria')
        .get(acaoOrcamentaria.getAcaoOrcamentaria);

/* ===== Rotas de Autor ===== */
    app.route('/autores')
        .get(autor.getAutor);

    app.route('/autores/:cod_autor')
        .get(autor.getAutorById);

/* ===== Rotas de Emenda ===== */
    app.route('/emendas')
        .get(emenda.getEmenda)
        .post(emenda.postEmenda);

    app.route('/emendas/:cod_emenda')
        .get(emenda.getEmendaById);

/* ===== Rotas de Fonte ===== */
    app.route('/fontes')
        .get(fonte.getFonte);

/* ===== Rotas de Gnd ===== */
    app.route('/gnd')
        .get(gnd.getGnd);

/* ===== Rotas de instrumentos ===== */
    app.route('/instrumentos')
        .get(instrumento.getInstrumento);

/* ===== Rotas de Legislação ===== */
    app.route('/legislacoes')
        .get(legislacao.getLegislacao);

    app.route('/legislacoes/:ano')
        .get(legislacao.getLegislacaoById);

/* ===== Rotas de Modalidade ===== */
    app.route('/modalidades')
        .get(modalidade.getModalidade);

/* ===== Rotas de Modalidade ===== */
    app.route('/ufs')
        .get(municipio.getUf);

    app.route('/municipios/:uf')
        .get(municipio.getMunicipioByUf);

/* ===== Rotas de Programas de Governo ===== */
    app.route('/programasGoverno')
        .get(programaGoverno.getProgramaGoverno);

/* ===== Rotas de Projetos ===== */
    app.route('/projetos')
        .get(projeto.getProjeto);

/* ===== Rotas de Programas de Governo ===== */
    app.route('/status')
        .get(status.getStatus);
}