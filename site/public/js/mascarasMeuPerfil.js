const inputTelPerfil = document.getElementById("inputTelefone");

inputTelPerfil.addEventListener("keypress", () => {
  let inputTelPerfil = inputTelefone.value.length;

  if (inputTelPerfil === 0) {
    inputTelefone.value += "(";
  } else if (inputTelPerfil === 3) {
    inputTelefone.value += ") ";
  } else if (inputTelPerfil === 10) {
    inputTelefone.value += "-";
  }
});

const inputCepPerfil = document.getElementById("inputCep");

inputCepPerfil.addEventListener("keypress", () => {
  let inputCepPerfil = inputCep.value.length;

  if (inputCepPerfil === 5) {
    inputCep.value += "-";
  }
});
