// GRAFICOS DA ESQUEDA
var data = [{
    label: 'Uso de RAM',
    data: [50, 80, 90, 30],
    backgroundColor: [
        '#7d2de2',
        '#2DE23F',
        '#2DB7E2',
        '#E22D63'
    ],
}];

var options01 = {
    color: '#fff',
    scales: {
        x: {
            ticks: {
                color: "#fff",
                font: {
                    size: 20,
                }
            }
        },
        y: {
            ticks: {
                color: "#fff",
                font: {
                    size: 20,
                }
            }
        }
    },

    y: {
        color: '#fff',
        beginAtZero: true,
        max: 100,
        ticks: {
            maxTicksLimit: 10,
        }
    },
};


var ctx = document.getElementById("myBarChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Caixa 1', 'Caixa 2', 'Caixa 3', 'Caixa 4'],
        datasets: data
    },
    options: options01
});


// ^^^^^^^^^^^^^^


// // GRAFICOS DA ESQUEDA

var data02 = [{
    label: 'Uso de RAM',
    data: [50, 80, 90, 30],
    backgroundColor: [
        '#7d2de2',
        '#2DE23F',
        '#2DB7E2',
        '#E22D63'
    ],
    borderColor:false
}];

var options02 = {
    color: '#fff',
};


var ctx = document.getElementById("pieChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: data02
    },
    options: options02
});