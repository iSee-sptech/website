const inputTelContact = document.getElementById("contactTelefone");

inputTelContact.addEventListener("keypress", () => {
  let inputTelContact = contactTelefone.value.length;

  if (inputTelContact === 0) {
    contactTelefone.value += "(";
  } else if (inputTelContact === 3) {
    contactTelefone.value += ") ";
  } else if (inputTelContact === 10) {
    contactTelefone.value += "-";
  }
});