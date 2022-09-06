var database = require("../database/config");

function listar() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()"
  );
  var instrucao = `
        SELECT * FROM usuario;
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM usuarios WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, endereco, dataNasc, cpf, celular, senha) {
  var instrucao = `
  insert into usuarios (nomeUsuario, emailUsuario, cepUsuario, dataNascUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, cargoUsuario ) values ('${nome}', '${email}', '${endereco}', '${dataNasc}', '${cpf}', '${celular}', '${senha}', 'Gerente');
  `;
  return database.executar(instrucao);
}

function cadastrarFunc(
  nomeFunc,
  emailFunc,
  enderecoFunc,
  dataNascFunc,
  cpfFunc,
  celularFunc,
  senhaFunc
) {
  var instrucao = `
  insert into usuarios (nomeUsuario, emailUsuario, cepUsuario, dataNascUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, cargoUsuario ) values ('${nomeFunc}', '${emailFunc}', '${enderecoFunc}', '${dataNascFunc}', '${cpfFunc}', '${celularFunc}', '${senhaFunc}', 'Suporte');
  `;
  return database.executar(instrucao);
}

function cadastrarCaixa(idCaixa, nomeCaixa, enderecoCaixa, imagemCaixa) {
  var instrucao = `
  insert into Maquinas (idMaquina, nomeMaquina, cepMaquina, imgMaquina) values ('${idCaixa}', '${nomeCaixa}', '${enderecoCaixa}', '${imagemCaixa}');
  `;
  return database.executar(instrucao);
}

function adicionarLembrete(mensagemLembrete, dataHoraLembrete) {
  var instrucao = `
  insert into Lembrete (mensagemLembrete, dataHoraLembrete) values ('${mensagemLembrete}', '${dataHoraLembrete}');
  `;
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  cadastrarFunc,
  cadastrarCaixa,
  adicionarLembrete,
};
