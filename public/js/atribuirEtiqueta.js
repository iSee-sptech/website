var listaIDCaixas = []

// function sleep(seconds) {
//   var e = new Date().getTime() + (seconds * 1000)
//   while (new Date().getTime() <= e) {} 
// }

async function inserirIDCaixasLista() {
  console.log("Listando caixas...")
    await fetch(`/usuarios/listarCaixas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resposta) => {
        resposta.json().then((data) => {
          for (var i = 0; i < data.length; i++) {
            var IDdaVez = data[i].idMaquina;
            if(!listaIDCaixas.includes(IDdaVez))
            listaIDCaixas.push(IDdaVez);
        }});
      })
      .catch(function (resposta) {
        console.log(`#ERRO: Erro ao listar caixas`);
      });

      console.log(listaIDCaixas)
      console.log("Listei caixas")
      
}

function obterDataHojeAmericano() {
    var date = new Date();
    const timeElapsed = Date.now();
    const diaAtual = new Date(timeElapsed).toLocaleDateString();
    const diaAtualFormatadoAmericano = diaAtual.split('/').reverse().join('-');
    return diaAtualFormatadoAmericano;
  }

async function inserirEtiqueta(nomeEtiqueta, idDaMaquina) {
  var nomeEtiqueta = nomeEtiqueta;
  var idDaMaquina = idDaMaquina;


  await fetch("/usuarios/inserirEtiqueta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeEtiquetaServer: nomeEtiqueta,
      idDaMaquinaServer: idDaMaquina,
    }),
  })
    .then(function (resposta) {
      // console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(`#SUCESSO: sucesso ao realizar o cadastro da etiqueta ${nomeEtiqueta} no caixa ${idDaMaquina}`);
      } else {
        throw "Houve um erro ao tentar realizar o cadastro da etiqueta!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: Houve um erro ao tenta realizar o cadastro da etiqueta ${nomeEtiqueta} no caixa ${idDaMaquina}`);
    });

  return false;
}

async function deletarEtiqueta(nomeEtiqueta, idDaMaquina) {
  var nomeEtiqueta = nomeEtiqueta;
  var idDaMaquina = idDaMaquina;


await fetch("/usuarios/deletarEtiqueta", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeEtiquetaServer: nomeEtiqueta,
      idDaMaquinaServer: idDaMaquina,
    }),
  })
    .then(function (resposta) {
      // console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(`#SUCESSO: sucesso ao realizar o cadastro da etiqueta ${nomeEtiqueta} no caixa ${idDaMaquina}`);
      } else {
        throw "Houve um erro ao tentar realizar o delete da etiqueta!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: Houve um erro ao tenta realizar o delete da etiqueta ${nomeEtiqueta} no caixa ${idDaMaquina}`);
    });

  return false;
}

 async function atribuirEtiquetas() {
    await inserirIDCaixasLista();
    for (var i = 0; i < listaIDCaixas.length; i++) {
        idDoCaixa = listaIDCaixas[i];
        console.log("Fazendo a chamada do caixa " + idDoCaixa)
        
    //ETIQUETA DE RAM - CAMINHADOR---------------------------------//
     await   fetch(`/usuarios/obterQtdAlertaRamLast30dias/${idDoCaixa}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resposta) => {
              resposta.json().then((data) => {
                console.log("Caixa do id " + idDoCaixa + ": QtdAlertaRamLast30dias " +  data[0].qtdAlertaRamLast30dias);
                qtdAlertaRam = data[0].qtdAlertaRamLast30dias; 
                
                if (qtdAlertaRam <= 9) {
                    console.log('Deletar Caminhador');
                    deletarEtiqueta("caminhador",idDoCaixa);
                }
                else {
                    console.log('Inserir Caminhador');
                     inserirEtiqueta("caminhador",idDoCaixa);
                }
              });
            })
            .catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
            });

    //ETIQUETA DE CPU - ---------------------------------//
     await fetch(`/usuarios/obterQtdAlertaCpuLast30dias/${idDoCaixa}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resposta) => {
              resposta.json().then((data) => {
                console.log("Caixa do id " + idDoCaixa + ": QtdAlertaCpuLast30dias " +  data[0].qtdAlertaCpuLast30dias);
                qtdAlertaCpu = data[0].qtdAlertaCpuLast30dias; 
                
                if (qtdAlertaCpu <= 9) {
                    console.log('Deletar atarefado');
                     deletarEtiqueta("atarefado",idDoCaixa);
                }
                else {
                    console.log('Inserir atarefado');
                     inserirEtiqueta("atarefado",idDoCaixa);
                }
              });
            })
            .catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
            });

            //ETIQUETA DE DORMINHOCO - ---------------------------------//
         await    fetch(`/usuarios/obterQtdRegistroHistoricoLast30dias/${idDoCaixa}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resposta) => {
            resposta.json().then((data) => {
              console.log("Caixa do id " + idDoCaixa + ": qtdRegistrosLast30dias " +  data[0].qtdRegistrosLast30dias);
              qtdRegistros = data[0].qtdRegistrosLast30dias; 
              
              if (qtdRegistros > 10800) {
                  console.log('Deletar dorminhoco');
                   deletarEtiqueta("dorminhoco",idDoCaixa);
              }
              else {
                  console.log('Inserir dorminhoco');
                    inserirEtiqueta("dorminhoco",idDoCaixa);
              }
            });
          })
          .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
          });
            
            
      //ETIQUETA DE DISCO - Enciclopedia---------------------------------// 
       await fetch(`/usuarios/obterInformacaoDiscoTotal/${idDoCaixa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resposta) => {
          resposta.json().then((data) => {
            console.log("Total de disco do id " + idDoCaixa + ": " + data[0].qtdTotalDisco);
            qtdTotalDisco = data[0].qtdTotalDisco; 
            
          
           fetch(`/usuarios/obterUltimoUsoDiscoHistorico/${idDoCaixa}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resposta) => {
                resposta.json().then((data) => {
                  console.log("Ultimo registro historico do id " + idDoCaixa + " : " + data[0].usoDisco);
                  usoDisco = data[0].usoDisco;
                });
              })
              .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              });
      
            // sleep(0.5)

            if (qtdTotalDisco * 0.7 < usoDisco) {
              console.log('Deletar enciclopedia');
               deletarEtiqueta("enciclopedia",idDoCaixa);
            }
            else {
              console.log('Inserir enciclopedia');
              inserirEtiqueta("enciclopedia",idDoCaixa);
            }
          });
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }
}