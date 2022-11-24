function filtrarApenasMemoria() {
  filtroSelecionado = "memoria";
  titulo_card1.innerHTML = "Porcentagem de Memória restante";
  titulo_card2.innerHTML = "Quantidade de Memória TOTAL";
  valor_card1.innerHTML = "";
  valor_card2.innerHTML = "";
  var options05 = {
    color: "#fff",
    scales: {
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          color: "#fff",
          font: {
            size: 10,
          },
        },
      },
    },

    y: {
      color: "#fff",
      beginAtZero: true,
      max: 100,
      ticks: {
        maxTicksLimit: 10,
      },
    },
  };

  obterDadosGrafico();

  function obterDadosGrafico() {
    fetch(`/medidas/memoria`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();

            plotarGrafico(resposta);
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados p/ gráfico: ${error.message}`
        );
      });
  }

  function plotarGrafico(resposta) {
    console.log("iniciando plotagem do gráfico...");
    let labels = [];
    let dados = {
      labels: labels,
      datasets: [
        {
          label: "Uso de DISCO (%)",
          data: [],
          fill: false,
          backgroundColor: ["#7d2de2", "#2DE23F", "#2DB7E2", "#E22D63"],
          tension: 0.1,
        },
      ],
      options: options05,
    };

    console.log("----------------------------------------------");
    console.log(
      'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);

    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.nomeMaquina);
      dados.datasets[0].data.push(registro.usoDisco);
    }

    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labels);
    console.log("Dados:");
    console.log(dados.datasets);
    console.log("----------------------------------------------");

    const config = {
      type: "bar",
      data: dados,
    };

    myChart.destroy();
    myChart = new Chart(document.getElementById("myBarChart"), config);
  }
}
