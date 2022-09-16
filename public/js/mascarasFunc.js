const inputCpfFunc = document.getElementById("input_cpf_func");

inputCpfFunc.addEventListener("keypress", () => {
  let inputLengthFunc = input_cpf_func.value.length;

  if (inputLengthFunc === 3 || inputLengthFunc === 7) {
    input_cpf_func.value += ".";
  } else if (inputLengthFunc === 11) {
    input_cpf_func.value += "-";
  }
});

const inputTelFunc = document.getElementById("input_cell_func");

inputTelFunc.addEventListener("keypress", () => {
  let inputLengthTelFunc = input_cell_func.value.length;

  if (inputLengthTelFunc === 0) {
    input_cell_func.value += "(";
  } else if (inputLengthTelFunc === 3) {
    input_cell_func.value += ") ";
  } else if (inputLengthTelFunc === 10) {
    input_cell_func.value += "-";
  }
});

const inputCepFunc = document.getElementById("input_endereco_func");

inputCepFunc.addEventListener("keypress", () => {
  let inputLength = input_endereco_func.value.length;

  if (inputLength === 5) {
    input_endereco_func.value += "-";
  }
});
