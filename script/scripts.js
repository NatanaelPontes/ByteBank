import selecionaCotacao from "./imprimeCotacao.js";
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    return horario;
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoeuro = document.getElementById('graficoeuro');
const graficoParaeuro = new Chart(graficoeuro, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'euro',
            data: [],
            borderWidth: 1
        }]
    }
})

let workereuro = new Worker("./script/workers/workerEuro.js");
workereuro.postMessage("euro");
workereuro.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaeuro, tempo, valor);
    selecionaCotacao("euro", valor)
})