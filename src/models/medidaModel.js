var database = require("../database/config");

function buscarUltimasMedidas() {
  instrucaoSql = `select 
    usoRamHistorico as usoRam,
    dataHoraHistorico,
    DATE_FORMAT(dataHoraHistorico,'%H:%i:%s') as momento_grafico
    from historico
    order by usoRamHistorico desc limit 10`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal() {
  instrucaoSql = `select 
                    usoRamHistorico,
                        dataHoraHistorico, 
                        DATE_FORMAT(dataHoraHistorico,'%H:%i:%s') as momento_grafico
                        from historico order by dataHoraHistorico desc limit 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
