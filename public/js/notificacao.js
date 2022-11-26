
const date = new Date();

function notificacaoCountAlertas() {

    fetch(`/usuarios/notificacaoCountAlertas`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resposta) => {
            notificacaoCaixasAdd()
            resposta.json().then((data) => {
                console.log(data);
                qntdAlertas = data[0].countAlerta;
                if (qntdAlertas >= 4) {
                    daddyNotificacao.innerHTML += `
           <div class="notificacao" onclick="window.location.href = 'alertas.html'">
          <h6>Você teve mais de ${qntdAlertas - 1} alertas hoje!!!</h6>
          <p>${date.toLocaleDateString()}</p>
          </div> 
            `
                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });
}


function notificacaoCaixasAdd() {

    fetch(`/usuarios/notificacaoCaixasAdd`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resposta) => {

            listaIdCaixas = [];

            resposta.json().then((data) => {
                console.log(data);
                countCaixas = data[0].countMaquinas;

                for (var i = 1; i < data.length; i++) {
                    var id = data[i].countMaquinas;
                    listaIdCaixas.push(id + " ")
                }

                if (countCaixas >= 1) {
                    daddyNotificacao.innerHTML += `
           <div class="notificacao" onclick="window.location.href = '../cadastroMaquina.html'">
          <h6>A ${countCaixas} Caixas a serem cadastrados!!!</h6>
          <p>IDs: ${listaIdCaixas}</p>
          </div> 
            `
                }
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });
}