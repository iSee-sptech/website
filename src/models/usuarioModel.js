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
function cadastrar(
  nome,
  email,
  endereco,
  dataNasc,
  cpf,
  celular,
  senha,
  numeroEndereco,
  complementoEndereco,
) {
  var instrucao = `
  insert into usuarios (nomeUsuario, emailUsuario, cepUsuario, dataNascUsuario, cpfUsuario, telefoneUsuario, senhaUsuario, numeroLocalUsuario, complementoLocalUsuario, cargoUsuario) values ('${nome}', '${email}', '${endereco}', '${dataNasc}', '${cpf}', '${celular}', '${senha}','${numeroEndereco}','${complementoEndereco}','Gerente');
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

function adicionarLembrete(mensagemLembrete, dataHoraLembrete, idUsuario) {
  var instrucao = `
  update Lembrete set mensagemLembrete = '${mensagemLembrete}', dataHoraLembrete = '${dataHoraLembrete}' where fkUsuario = '${idUsuario}';
  `;
  return database.executar(instrucao);
}

function mostrarLembrete(idUsuario) {
  var instrucao = `
  select mensagemLembrete from Lembrete where fkUsuario ='${idUsuario}';
  `;
  return database.executar(instrucao);
}

function updatePerfil(id, nome, telefone, email, cep) {
  const query = `UPDATE usuarios SET nomeUsuario = '${nome}', telefoneUsuario = '${telefone}',
  emailUsuario = '${email}', cepUsuario = '${cep}' WHERE idUsuario = ${id} `;
  return database.executar(query);
}

function listarPerfil(idUser) {
  var instrucao = `
  SELECT nomeUsuario, telefoneUsuario, emailUsuario, cepUsuario FROM usuarios WHERE idUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function listarLembrete(idUser) {
  var instrucao = `
  SELECT mensagemLembrete, dataHoraLembrete FROM lembrete WHERE fkUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function exibirFuncionarios() {
  var instrucao = `
  SELECT nomeUsuario from Usuarios where idUsuario = 4;
  `;
  return database.executar(instrucao);
}

function exibirCaixas() {
  var instrucao = `
  SELECT count(idMaquina) from Maquinas;
  `;
  return database.executar(instrucao);
}

function imgUsuario(idUser) {
  var instrucao = `
  SELECT * FROM usuarios WHERE idUsuario = ${idUser};
  `;
  return database.executar(instrucao);
}

function atualizarImg(idUser, img) {
  const query = `UPDATE usuario SET imagemPerfilUsuario = '${img}' WHERE idUsuario = ${idUser}`;

  return database.executar(query);
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  cadastrarFunc,
  cadastrarCaixa,
  adicionarLembrete,
  mostrarLembrete,
  updatePerfil,
  listarPerfil,
  listarLembrete,
  exibirFuncionarios,
  exibirCaixas,
  imgUsuario,
  atualizarImg,
};
