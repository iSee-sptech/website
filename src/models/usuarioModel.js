var database = require("../database/config");

function obterDataHojeAmericano() {
  var date = new Date();
  const timeElapsed = Date.now();
  const diaAtual = new Date(timeElapsed).toLocaleDateString();
  const diaAtualFormatadoAmericano = diaAtual.split("/").reverse().join("-");
  return diaAtualFormatadoAmericano;
}

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM usuarios WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarSenha(emailRedefinir, senhaRedefinir) {
  var instrucao = `
    UPDATE Usuarios SET senhaUsuario = '${senhaRedefinir}' WHERE emailUsuario = '${emailRedefinir}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(
  nome,
  email,
  endereco,
  dataNasc,
  cpf,
  celular,
  senha,
  numeroEndereco,
  complementoEndereco
) {
  var instrucao = `
  insert into usuarios (nomeUsuario, emailUsuario, cepUsuario, dataNascUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, numeroLocalUsuario, complementoLocalUsuario, cargoUsuario) values ('${nome}', '${email}', '${endereco}', '${dataNasc}', '${cpf}', '${celular}', '${senha}','${numeroEndereco}','${complementoEndereco}','Gerente');
  `;
  return database.executar(instrucao);
}

function cadastrarFunc(
  nomeFunc,
  emailFunc,
  enderecoFunc,
  numFunc,
  complementoFunc,
  dataNascFunc,
  cpf,
  celularFunc,
  senhaFunc
) {
  var instrucao = `
  insert into usuarios (nomeUsuario, emailUsuario, cepUsuario, dataNascUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, cargoUsuario, numeroLocalUsuario, complementoLocalUsuario ) values ('${nomeFunc}', '${emailFunc}', '${enderecoFunc}', '${dataNascFunc}', '${cpf}', '${celularFunc}', '${senhaFunc}', 'Suporte', '${numFunc}', '${complementoFunc}');
  `;
  return database.executar(instrucao);
}

function cadastrarCaixa(
  idCaixa,
  nomeCaixa,
  enderecoCaixa,
  imagemCaixa,
  numeroSerial,
  numero,
  complemento,
  pontoReferencia
) {
  var instrucao = `
  update Maquinas set idMaquina = '${idCaixa}', nomeMaquina = '${nomeCaixa}', cepMaquina = '${enderecoCaixa}', imgMaquina = '${imagemCaixa}', serialMaquina = '${numeroSerial}', numeroMaquina = '${numero}',complementoMaquina = '${complemento}', pontoDeReferencia = '${pontoReferencia}' where idMaquina = '${idCaixa}';
  `;
  return database.executar(instrucao);
}

function adicionarLembrete(mensagemLembrete, dataHoraLembrete, idUsuario) {
  var instrucao = `
  update Lembrete set mensagemLembrete = '${mensagemLembrete}', dataHoraLembrete = '${dataHoraLembrete}' where fkUsuario = '${idUsuario}';
  `;
  return database.executar(instrucao);
}

function mostrarLembrete(idUsuario) {
  var instrucao = `
  select mensagemLembrete from Lembrete where fkUsuario ='${idUsuario}';
  `;
  return database.executar(instrucao);
}

function updatePerfil(id, nome, telefone, email, cep, numero, complemento) {
  const query = `UPDATE usuarios SET nomeUsuario = '${nome}', telefoneUsuario = '${telefone}',
  emailUsuario = '${email}', cepUsuario = '${cep}', numeroLocalUsuario = '${numero}', complementoLocalUsuario = '${complemento}' WHERE idUsuario = ${id} `;
  return database.executar(query);
}

function listarPerfil(idUser) {
  var instrucao = `
  SELECT nomeUsuario, cpfUsuario, telefoneUsuario, emailUsuario, cepUsuario, numeroLocalUsuario, complementoLocalUsuario FROM usuarios WHERE idUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function listarLembrete(idUser) {
  var instrucao = `
  SELECT mensagemLembrete, dataHoraLembrete FROM lembrete WHERE fkUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function exibirFuncionarios() {
  var instrucao = `
  SELECT count(idUsuario) as 'idUsuario' from Usuarios;
  `;
  return database.executar(instrucao);
}

function exibirQuantidadeTotalRam() {
  var instrucao = `
  SELECT sum(ramMaquina) as 'totalRam' FROM Maquinas;
  `;
  return database.executar(instrucao);
}

function exibirCaixas() {
  var instrucao = `
  SELECT count(idMaquina) as 'qtdCaixa' from Maquinas;
  `;
  return database.executar(instrucao);
}

function exibirQtdTotalEtiquetas() {
  var instrucao = `
  SELECT count(idEtiqueta) as 'qtdTotalEtiquetas' FROM Etiqueta;
  `;
  return database.executar(instrucao);
}

function exibirQtdHistorico() {
  var instrucao = `
  SELECT count(idHistorico) as 'idHistorico' from Historico;
  `;
  return database.executar(instrucao);
}

function listarCaixas() {
  var instrucao = `
  SELECT idMaquina, nomeMaquina, cepMaquina, ramMaquina, discoMaquina, processadorMaquina, tempoDeAtividade, sistemaOperacionalMaquina,
  fabricanteMaquina, arquiteturaMaquina, imgMaquina  FROM Maquinas;
  `;
  return database.executar(instrucao);
}

function listarHistorico() {
  var instrucao = `
  SELECT fkMaquinaHistorico, idHistorico, usoRamHistorico, usoProcessadorHistorico, usoDiscoHistorico,
  dataHoraHistorico from historico;
  `;
  return database.executar(instrucao);
}

function imgUsuario(idUser) {
  var instrucao = `
  SELECT * FROM usuarios WHERE idUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function atualizarImg(idUser, img) {
  const query = `UPDATE usuarios SET imagemPerfilUsuario = '${img}' WHERE idUsuario = ${idUser}`;

  return database.executar(query);
}

function listarUser(cpf) {
  const query = `
      SELECT * FROM usuarios WHERE cpfUsuario = '${cpf}';
  `;
  return database.executar(query);
}

function lembreteDefault(idUser) {
  const query = `INSERT INTO lembrete VALUES (null, "Crie um lembrete!", "2022-01-01 10:00:00", null, '${idUser}');`;

  return database.executar(query);
}

function pesquisarCaixa(caixa) {
  var instrucao = `
  select * from maquinas where idMaquina = ${caixa};
  `;
  return database.executar(instrucao);
}

function pesquisarHistorico(dataHora) {
  var instrucao = `
  select * from historico where dataHoraHistorico like "${dataHora}%";
  `;
  return database.executar(instrucao);
}

function obterAlertasPorData(data) {
  // var instrucao = `
  // select * from alerta where datahoraAlerta LIKE '%${data}%'
  // `;
  //var instrucao = `
  //SELECT
  //[dbo].[Maquinas].nomeMaquina AS 'Nome',
  //[dbo].[Alerta].componente AS 'Componente', [dbo].[Alerta].nivelAlerta AS 'Nivel', [dbo].[Alerta].dado AS 'Dado', [dbo].[Alerta].datahoraAlerta AS 'DataHora'
  //FROM [dbo].[Alerta] JOIN [dbo].[Maquinas] ON [dbo].[Maquinas].idMaquina = [dbo].[Alerta].fkMaquina
  //ORDER BY [dbo].[Alerta].nivelAlerta desc, [dbo].[Alerta].datahoraAlerta desc
  //`;
  var instrucao = `select Maquinas.nomeMaquina as 'Nome', Alerta.componente as 'Componente', Alerta.nivelAlerta as 'Nivel', Alerta.dado as 'Dado', Alerta.datahoraAlerta as 'DataHora'
  from Alerta join Maquinas on Maquinas.idMaquina = Alerta.fkMaquina where datahoraAlerta LIKE '%${data}%'
  order by Alerta.nivelAlerta desc, Alerta.datahoraAlerta desc`;
  return database.executar(instrucao);
}

function exibirQtdTotalAlertasDoDia(data) {
  var instrucao = `
  select count(idAlerta) as 'quantidadeTotalAlertas' from Alerta where datahoraAlerta like '%${data}%';
  `;
  return database.executar(instrucao);
}

function exibirQtdTotalCaixasRam(data) {
  var instrucao = `
  select count(distinct Maquinas.idMaquina) as 'quantidadeTotalMaquinas' from Maquinas join Alerta on Maquinas.idMaquina = Alerta.fkMaquina where componente = 'ram' and datahoraAlerta like '%${data}%';
  `;
  return database.executar(instrucao);
}

function exibirQtdTotalCaixasCpu(data) {
  var instrucao = `
  select count(distinct Maquinas.idMaquina) as 'quantidadeTotalMaquinas' from Maquinas join Alerta on Maquinas.idMaquina = Alerta.fkMaquina where componente = 'cpu' and datahoraAlerta like '%${data}%';
  `;
  return database.executar(instrucao);
}

function exibirQtdTotalCaixasDisco(data) {
  var instrucao = `
  select count(distinct Maquinas.idMaquina) as 'quantidadeTotalMaquinas' from Maquinas join Alerta on Maquinas.idMaquina = Alerta.fkMaquina where componente = 'disco' and datahoraAlerta like '%${data}%';
  `;
  return database.executar(instrucao);
}

function listarIDs() {
  var instrucao = `
  select idMaquina as 'identificador' from Maquinas';
  `;
  return database.executar(instrucao);
}

/*------------------------ETIQUETAS-------------------------------------- */
function obterQtdAlertaRamLast30dias(idDoCaixa) {
  // var instrucao = `
  // SELECT count(idAlerta) AS 'qtdAlertaRamLast30dias' FROM Alerta
  // WHERE componente = 'ram' AND fkMaquina = ${idDoCaixa} AND datahoraAlerta BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -30 DAY) AND CURRENT_DATE()
  // `;

  var instrucao = `
  SELECT count(idAlerta) AS 'qtdAlertaRamLast30dias' FROM Alerta 
  WHERE componente = 'ram' AND fkMaquina = ${idDoCaixa} AND datahoraAlerta BETWEEN DATEADD(DAY, -30, '${obterDataHojeAmericano()}') AND '${obterDataHojeAmericano()}';
  `;
  return database.executar(instrucao);
}

function obterQtdAlertaCpuLast30dias(idDoCaixa) {
  var instrucao = `
  SELECT count(idAlerta) AS 'qtdAlertaCpuLast30dias' FROM Alerta 
  WHERE componente = 'cpu' AND fkMaquina = ${idDoCaixa} AND datahoraAlerta BETWEEN DATEADD(DAY, -30, '${obterDataHojeAmericano()}') AND '${obterDataHojeAmericano()}';
  `;
  return database.executar(instrucao);
}

function obterQtdRegistroHistoricoLast30dias(idDoCaixa) {
  var instrucao = `
  SELECT fkMaquinaHistorico, COUNT(fkMaquinaHistorico) AS 'qtdRegistrosLast30dias' FROM Historico 
  WHERE fkMaquinaHistorico = ${idDoCaixa} AND datahoraHistorico BETWEEN DATEADD(DAY, -30, '${obterDataHojeAmericano()}') AND '${obterDataHojeAmericano()}';
  `;
  return database.executar(instrucao);
}

function obterInformacaoDiscoTotal(idDoCaixa) {
  var instrucao = `
  SELECT discoMaquina as 'qtdTotalDisco' FROM Maquinas
  WHERE idMaquina = ${idDoCaixa}
  `;
  return database.executar(instrucao);
}

function obterUltimoUsoDiscoHistorico(idDoCaixa) {
  var instrucao = `
  SELECT TOP 1 usoDiscoHistorico as 'usoDisco' FROM Maquinas
  WHERE idMaquina = ${idDoCaixa}
  order by dataHoraHistorico desc
  `;
  return database.executar(instrucao);
}

function inserirEtiqueta(nomeEtiqueta, idDaMaquina) {
  var instrucao = `
  INSERT INTO Etiqueta VALUES (${idDaMaquina},"${nomeEtiqueta}",${obterDataHojeAmericano()})
  `;
  return database.executar(instrucao);
}

function deletarEtiqueta(nomeEtiqueta, idDaMaquina) {
  var instrucao = `
  DELETE FROM Etiqueta where fkMaquina = ${idDaMaquina} AND nomeEtiqueta = ${nomeEtiqueta}
  `;
  return database.executar(instrucao);
}

function listarEtiquetasComNomeCaixa() {
  var instrucao = `
  SELECT *,nomeMaquina FROM Etiqueta join Maquinas on fkMaquina = idMaquina;
  `;
  return database.executar(instrucao);
}

/*------------------------fim de ETIQUETAS-------------------------------------- */

function graficoUsoRam() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function grafico_jogador()"
  );
  var instrucao = `
  select round(((usoRamHistorico * 100) / ramMaquina)) as porcRam,
  nomeMaquina as nomeCaixa from historico
  join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  order by usoRamHistorico desc limit 4;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function exibirEficienciaGlobalDoDia(data) {
  var instrucao = `
  select round(sum(((((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina)) + (((usoDiscoHistorico * 100) / discoMaquina))) / 3) / count(idHistorico)) 
  as "eficienciaGlobal" from Historico join Maquinas on Historico.fkMaquinaHistorico = Maquinas.idMaquina where dataHoraHistorico like '%${data}%' order by idHistorico desc;
  `;
  return database.executar(instrucao);
}

function exibirPorcentagemRestanteGlobal(data) {
  var instrucao = `
  select round(100 - (sum(((((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina)) + (((usoDiscoHistorico * 100) / discoMaquina))) / 3) / count(idHistorico))) 
  as "eficienciaGlobalRestante" from Historico join Maquinas on Historico.fkMaquinaHistorico = Maquinas.idMaquina where dataHoraHistorico like '%${data}%' order by idHistorico desc;
  `;
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  atualizarSenha,
  cadastrar,
  listar,
  cadastrarFunc,
  cadastrarCaixa,
  adicionarLembrete,
  mostrarLembrete,
  updatePerfil,
  listarPerfil,
  listarLembrete,
  exibirFuncionarios,
  exibirQuantidadeTotalRam,
  exibirCaixas,
  exibirQtdTotalEtiquetas,
  listarCaixas,
  listarHistorico,
  imgUsuario,
  atualizarImg,
  listarUser,
  lembreteDefault,
  pesquisarCaixa,
  pesquisarHistorico,
  exibirQtdHistorico,
  obterAlertasPorData,
  exibirQtdTotalAlertasDoDia,
  exibirQtdTotalCaixasRam,
  exibirQtdTotalCaixasCpu,
  exibirQtdTotalCaixasDisco,
  listarIDs,

  /*------------------------ETIQUETAS-------------------------------------- */
  obterQtdAlertaRamLast30dias,
  obterQtdAlertaCpuLast30dias,
  obterInformacaoDiscoTotal,
  obterUltimoUsoDiscoHistorico,
  obterQtdRegistroHistoricoLast30dias,
  inserirEtiqueta,
  deletarEtiqueta,
  listarEtiquetasComNomeCaixa,
  /*------------------------DASHBOARD-------------------------------------- */
  graficoUsoRam,
  exibirEficienciaGlobalDoDia,
  exibirPorcentagemRestanteGlobal,

};
