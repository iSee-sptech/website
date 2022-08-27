var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {
    instrucaoSql = `select 
                        lm35,
                        data_horario,
                        DATE_FORMAT(data_horario,'%H:%i:%s') as momento_grafico
                    from hist_medicao
                    where fk_sensor = ${idAquario}
                    order by data_horario desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    instrucaoSql = `select 
                        lm35,
                        data_horario, 
                        DATE_FORMAT(data_horario,'%H:%i:%s') as momento_grafico, 
                        fk_sensor 
                        from hist_medicao where fk_sensor = ${idAquario} 
                    order by data_horario desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}