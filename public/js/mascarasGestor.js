const inputCpf = document.getElementById('input_cpf_gestor');

inputCpf.addEventListener('keypress', () => {
    let inputLength = input_cpf_gestor.value.length

    if(inputLength === 3 || inputLength === 7){
        input_cpf_gestor.value += '.'
    } else if (inputLength === 11){
        input_cpf_gestor.value += '-'
    }
})

const inputTel = document.getElementById('input_cell_gestor');

inputTel.addEventListener('keypress', () => {
    let inputLengthTel = input_cell_gestor.value.length

    if (inputLengthTel === 0){
        input_cell_gestor.value += '('
    } else if (inputLengthTel === 3){
        input_cell_gestor.value += ') '
    } else if (inputLengthTel === 10){
        input_cell_gestor.value += '-'
    }
})

const inputCep = document.getElementById('input_endereco_gestor');

inputCep.addEventListener('keypress', () => {
    let inputLength = input_endereco_gestor.value.length

    if(inputLength === 5){
        input_endereco_gestor.value += '-'
    }
})