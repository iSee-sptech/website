var qtdCaixa = 0;
function obterQtdCaixas() {
    fetch(`/usuarios/exibirCaixas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resposta) => {
        resposta.json().then((data) => {
          qtdCaixa = data[0].qtdCaixa; 
          console.log("QtdCaixas " + qtdCaixa);
          return qtdCaixa;
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
}

function obterDataHojeAmericano() {
    var date = new Date();
    const timeElapsed = Date.now();
    const diaAtual = new Date(timeElapsed).toLocaleDateString();
    const diaAtualFormatadoAmericano = diaAtual.split('/').reverse().join('-');
    return diaAtualFormatadoAmericano;
  }

function inserirEtiqueta(nomeEtiqueta, idDaMaquina) {
  var nomeEtiqueta = nomeEtiqueta;
  var idDaMaquina = idDaMaquina;


  fetch("/usuarios/inserirEtiqueta", {
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
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log("Cadastro efetuado com sucesso!");

        setTimeout(() => {
          window.location = "dashboard/homeGestor.html";
        }, "1000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function deletarEtiqueta(nomeEtiqueta, idDaMaquina) {
  var nomeEtiqueta = nomeEtiqueta;
  var idDaMaquina = idDaMaquina;


  fetch("/usuarios/deletarEtiqueta", {
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
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log("Cadastro efetuado com sucesso!");

        setTimeout(() => {
          window.location = "dashboard/homeGestor.html";
        }, "1000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function atribuirEtiquetas() {
    // var qtdCaixa = obterQtdCaixas();
    
    var idDoCaixa = 0;
    
    for (var i = 1; i <= qtdCaixa; i++) {
        idDoCaixa = i;
        console.log("Fazendo a chamada do caixa " + idDoCaixa)
        
    //ETIQUETA DE RAM - CAMINHADOR---------------------------------//
        fetch(`/usuarios/obterQtdAlertaRamLast30dias/${idDoCaixa}`, {
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
                    inserirEtiqueta("caminhador",idDoCaixa);
                }
                else {
                    console.log('Inserir Caminhador');
                    deletarEtiqueta("caminhador",idDoCaixa);
                }
              });
            })
            .catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
            });

    //ETIQUETA DE CPU - ---------------------------------//
        fetch(`/usuarios/obterQtdAlertaCpuLast30dias/${idDoCaixa}`, {
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

            //ETIQUETA DE CPU - ---------------------------------//
        fetch(`/usuarios/obterQtdRegistroHistoricoLast30dias/${idDoCaixa}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resposta) => {
            resposta.json().then((data) => {
              console.log("Caixa do id " + idDoCaixa + ": qtdRegistrosLast30dias " +  data[0].qtdRegistrosLast30dias);
              qtdRegistros = data[1].qtdRegistrosLast30dias; 
              
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
      fetch(`/usuarios/obterInformacaoDiscoTotal/${idDoCaixa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resposta) => {
          resposta.json().then((data) => {
            console.log("Total de disco do id " + idDoCaixa);
            qtdTotalDisco = data[0].qtdTotalDisco; 
            

            fetch(`/usuarios/obterUltimoUsoDiscoHistorico/${idDoCaixa}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((resposta) => {
                resposta.json().then((data) => {
                  console.log("Total de disco do id " + idDoCaixa);
                  usoDisco = data[0].usoDisco; 

                });
              })
              .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              });
      
            
            if (qtdTotalDisco * 0.7 < usoDisco) {
              console.log('Deletar atarefado');
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
        });z
    }
}