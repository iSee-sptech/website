function filtrarApenasCpu() {
  filtroSelecionado = "cpu";
  titulo_card1.innerHTML = "Porcentagem da CPU atingida";
  titulo_card2.innerHTML = "Velocidade máxima da CPU";
  valor_card1.innerHTML = "";
  valor_card2.innerHTML = "";
  var options04 = {
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
    fetch(`/medidas/cpu`, { cache: "no-store" })
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
          label: "Uso de CPU (%)",
          data: [],
          fill: false,
          backgroundColor: ["#7d2de2", "#2DE23F", "#2DB7E2", "#E22D63"],
          tension: 0.1,
        },
      ],
      options: options04,
    };

    console.log("----------------------------------------------");
    console.log(
      'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);

    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.nomeMaquina);
      dados.datasets[0].data.push(registro.usoCpu);
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
    setTimeout(() => atualizarGrafico(dados, myChart), 9000);
  }

  function atualizarGrafico(dados, myChart) {
    fetch(`/medidas/tempo-real-cpu`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (novoRegistro) {
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            console.log(`Dados atuais do gráfico:`);
            console.log(dados);

            if (
              novoRegistro[0].momento_grafico ==
              dados.labels[dados.labels.length - 1]
            ) {
              console.log(
                "---------------------------------------------------------------"
              );
              console.log(
                "Como não há dados novos para captura, o gráfico não atualizará."
              );
              console.log("Horário do novo dado capturado:");
              console.log(novoRegistro[0].momento_grafico);
              console.log("Horário do último dado capturado:");
              console.log(dados.labels[dados.labels.length - 1]);
              console.log(
                "---------------------------------------------------------------"
              );
            } else {
              dados.labels.shift();
              dados.labels.push(novoRegistro[0].nomeMaquina);

              dados.datasets[0].data.shift();
              dados.datasets[0].data.push(novoRegistro[0].usoCpu);
              myChart.update();
            }
            proximaAtualizacao = setTimeout(
              () => atualizarGrafico(dados, myChart),
              9000
            );
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na API");
          proximaAtualizacao = setTimeout(
            () => atualizarGrafico(dados, myChart),
            9000
          );
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados p/ gráfico: ${error.message}`
        );
      });
  }

  var options10 = {
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

  obterDadosGraficoPizza();

  function obterDadosGraficoPizza() {
    fetch(`/medidas/cpu-pizza`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();

            plotarGrafico2(resposta);
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

  function plotarGrafico2(resposta) {
    console.log("iniciando plotagem do gráfico...");
    let labels = [];
    let dados = {
      labels: labels,
      datasets: [
        {
          label: "Uso de CPU ontem(%)",
          data: [],
          fill: false,
          backgroundColor: ["#7d2de2", "#2DE23F", "#2DB7E2", "#E22D63"],
          tension: 0.1,
        },
      ],
      options: options10,
    };

    console.log("----------------------------------------------");
    console.log(
      'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);

    for (i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(registro.nomeMaquinaPizza);
      dados.datasets[0].data.push(registro.usoCpuPizza);
    }

    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labels);
    console.log("Dados:");
    console.log(dados.datasets);
    console.log("----------------------------------------------");

    const config2 = {
      type: "doughnut",
      data: dados,
    };
    doughnutChart.destroy();
    doughnutChart = new Chart(document.getElementById("myDoughChart"), config2);
  }
}
