var database = require("../database/config");

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
  instrucaoSql = `select 
select round(((((usoRamHistorico * 100) / ramMaquina)) + (((usoProcessadorHistorico * 100) / processadorMaquina)),
dataHoraHistorico, 
DATE_FORMAT(dataHoraHistorico,'%H:%i:%s') as momento_grafico,
from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina order by dataHoraHistorico
desc limit 1`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function eficienciaRam() {
  instrucaoSql = `select round((usoRamHistorico * 100)/ramMaquina) as "usoRam", nomeMaquina as "nomeMaquina"
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoRam limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function eficienciaCpu() {
  instrucaoSql = `select round((usoProcessadorHistorico * 100)/processadorMaquina) as "usoCpu", nomeMaquina as "nomeMaquina"
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoCpu limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function eficienciaMemoria() {
  instrucaoSql = `select round((usoDiscoHistorico * 100)/discoMaquina) as "usoDisco", nomeMaquina as "nomeMaquina"
  from historico join maquinas on historico.fkMaquinaHistorico = maquinas.idMaquina
  group by nomeMaquina order by usoDisco limit 4;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  eficienciaRam,
  eficienciaCpu,
  eficienciaMemoria,
}
