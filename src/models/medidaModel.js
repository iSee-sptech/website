var database = require("../database/config");

//-----------------------------------------SELECTS EFICIENCIA---------------------------------------------------------
function buscarUltimasMedidas() {
  instrucaoSql = `select round(((((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina))
  + (((usoDiscoHistorico * 100) / discoMaquina))) / 3) as "eficienciaGlobal",
  nomeMaquina as "nomeMaquina" from historico
  join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by eficienciaGlobal limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {
  instrucaoSql = `
  select round(((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina)) as 'eficienciaGlobal',
  dataHoraHistorico as 'momento_grafico', 
  DATE_FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina' from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina order by dataHoraHistorico desc limit 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS EFICIENCIA-----------------------------------------------------

//-----------------------------------------SELECTS RAM----------------------------------------------------------------
function eficienciaRam() {
  instrucaoSql = `select round((usoRamHistorico * 100)/ramMaquina) as 'usoRam', nomeMaquina as 'nomeMaquina'
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoRam limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasRam() {
  instrucaoSql = `select round((usoRamHistorico * 100)/ramMaquina) as 'usoRam',
  dataHoraHistorico as 'momento_grafico', 
  DATE_FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  order by dataHoraHistorico desc limit 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS RAM------------------------------------------------------------

//-----------------------------------------SELECTS CPU----------------------------------------------------------------
function eficienciaCpu() {
  instrucaoSql = `select round((usoProcessadorHistorico * 100)/processadorMaquina) as 'usoCpu', nomeMaquina as 'nomeMaquina'
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoCpu limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasCpu() {
  instrucaoSql = `select round((usoProcessadorHistorico * 100)/processadorMaquina) as 'usoCpu',
  dataHoraHistorico as 'momento_grafico', 
  DATE_FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  order by dataHoraHistorico desc limit 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS CPU------------------------------------------------------------

//-----------------------------------------SELECTS MEMORIA------------------------------------------------------------
function eficienciaMemoria() {
  instrucaoSql = `select round((usoDiscoHistorico * 100)/discoMaquina) as "usoDisco", nomeMaquina as "nomeMaquina"
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoDisco limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasMemoria() {
  instrucaoSql = `select round((usoDiscoHistorico * 100)/discoMaquina) as 'usoMemoria',
  dataHoraHistorico as 'momento_grafico', 
  DATE_FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  order by dataHoraHistorico desc limit 1;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS MEMORIA--------------------------------------------------------

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  eficienciaRam,
  eficienciaCpu,
  eficienciaMemoria,
  medidasRam,
  medidasCpu,
  medidasMemoria,
};
