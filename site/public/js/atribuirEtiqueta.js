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
                    console.log('delete');
                }
                else {
                    console.log('insert');
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
                    console.log('delete');
                }
                else {
                    console.log('insert');
                }
              });
            })
            .catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
            });
            
            
            
    }
}