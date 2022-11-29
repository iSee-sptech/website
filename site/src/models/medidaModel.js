var database = require("../database/config");

//-----------------------------------------SELECTS EFICIENCIA---------------------------------------------------------
function buscarUltimasMedidas() {
  instrucaoSql = `select  top 4 round((((((usoRamHistorico * 100) / ramMaquina)) + usoProcessadorHistorico
  + (((usoDiscoHistorico * 100) / discoMaquina))) / 3) ,0) as "eficienciaGlobal",
  nomeMaquina as "nomeMaquina" 
  from historico
  join [dbo].[Maquinas] 
  on [dbo].[Historico].fkMaquinaHistorico = [dbo].[Maquinas].idMaquina
  order by eficienciaGlobal`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {
  instrucaoSql = `
  select top 1 round((((usoRamHistorico * 100) / ramMaquina)) +
  (usoProcessadorHistorico) + (((usodiscoHistorico * 100) / discoMaquina)), 0) as 'eficienciaGlobal',
  dataHoraHistorico as 'momento_grafico', 
  FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from historico 
  join maquinas 
  on historico.fkMaquinaHistorico = maquinas.idMaquina 
  order by dataHoraHistorico desc;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS EFICIENCIA-----------------------------------------------------

//-----------------------------------------SELECTS RAM----------------------------------------------------------------
function eficienciaRam() {
  instrucaoSql = `select top 4 round(((usoRamHistorico * 100)/ramMaquina), 2) as 'usoRam', nomeMaquina as 'nomeMaquina', idMaquina
  from [dbo].[Historico] 
  join [dbo].[Maquinas] 
  on [dbo].[Historico].fkMaquinaHistorico = [dbo].[Maquinas].idMaquina
  order by usoRam;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasRam() {
  instrucaoSql = `select top 1 round(((usoRamHistorico * 100)/ramMaquina), 2) as 'usoRam',
  dataHoraHistorico as 'momento_grafico', 
  format(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from [dbo].[Historico] join [dbo].[Maquinas] on [dbo].[Historico].fkMaquinaHistorico = [dbo].[Maquinas].idMaquina
  order by dataHoraHistorico desc;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS RAM------------------------------------------------------------

//-----------------------------------------SELECTS CPU----------------------------------------------------------------
function eficienciaCpu() {
  instrucaoSql = `select top 4 AVG(usoProcessadorHistorico) as 'usoCpu', idMaquina
  from historico h
  join maquinas m
  on h.fkMaquinaHistorico = m.idMaquina
  group by m.idMaquina
  order by usoCpu;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasCpu() {
  instrucaoSql = `select top 4 usoProcessadorHistorico as 'usoCpu',
  dataHoraHistorico as 'momento_grafico', 
  FORMAT(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from historico 
  join maquinas 
  on historico.fkMaquinaHistorico = maquinas.idMaquina
  order by dataHoraHistorico desc;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
//-----------------------------------------FIM SELECTS CPU------------------------------------------------------------

//-----------------------------------------SELECTS MEMORIA------------------------------------------------------------
function eficienciaMemoria() {
  instrucaoSql = `select top 4 round(((usoDiscoHistorico * 100)/discoMaquina), 2) as "usoDisco", nomeMaquina as "nomeMaquina"
  from [dbo].[Historico] 
  join [dbo].[Maquinas] 
  on [dbo].[Historico].fkMaquinaHistorico = [dbo].[Maquinas].idMaquina
  order by usoDisco;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function medidasMemoria() {
  instrucaoSql = `select top 1 round(((usoDiscoHistorico * 100)/discoMaquina), 2) as 'usoMemoria',
  dataHoraHistorico as 'momento_grafico', 
  format(dataHoraHistorico,'%H:%i:%s'),
  nomeMaquina as 'nomeMaquina'
  from [dbo].[Historico] 
  join [dbo].[Maquinas] 
  on [dbo].[Historico].fkMaquinaHistorico = [dbo].[Maquinas].idMaquina
  order by dataHoraHistorico desc;`;
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
