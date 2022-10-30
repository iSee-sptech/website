const inputCepMaquina = document.getElementById('input_endereco_maquina');

inputCepMaquina.addEventListener('keypress', () => {
    let inputLength = input_endereco_maquina.value.length

    if(inputLength === 5){
        input_endereco_maquina.value += '-'
    }
})