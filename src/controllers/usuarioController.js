var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
  console.log("ENTRAMOS NA usuarioController");
  res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeGestorServer;
  var email = req.body.emailGestorServer;
  var endereco = req.body.enderecoGestorServer;
  var dataNasc = req.body.dataNascGestorServer;
  var cpf = req.body.cpfGestorServer;
  var celular = req.body.celularGestorServer;
  var senha = req.body.senhaGestorServer;
  var numeroEndereco = req.body.numeroEnderecoGestorServer;
  var complementoEndereco = req.body.complementoEnderecoGestorServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(
        nome,
        email,
        endereco,
        dataNasc,
        cpf,
        celular,
        senha,
        numeroEndereco,
        complementoEndereco,
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarFunc(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeFunc = req.body.nomeFuncServer;
  var emailFunc = req.body.emailFuncServer;
  var enderecoFunc = req.body.enderecoFuncServer;
  var dataNascFunc = req.body.dataNascFuncServer;
  var cpfFunc = req.body.cpfFuncServer;
  var celularFunc = req.body.celularFuncServer;
  var senhaFunc = req.body.senhaFuncServer;

  // Faça as validações dos valores
  if (nomeFunc == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (emailFunc == undefined) {
    res.status(400).send("Seu endereço está undefined!");
  } else if (senhaFunc == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarFunc(
        nomeFunc,
        emailFunc,
        enderecoFunc,
        dataNascFunc,
        cpfFunc,
        celularFunc,
        senhaFunc
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarCaixa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var idCaixa = req.body.idCaixaServer;
  var nomeCaixa = req.body.nomeCaixaServer;
  var enderecoCaixa = req.body.enderecoCaixaServer;
  var imagemCaixa = req.body.imagemCaixaServer;

  // Faça as validações dos valores
  if (nomeCaixa == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (enderecoCaixa == undefined) {
    res.status(400).send("Seu endereço está undefined!");
  } else if (imagemCaixa == undefined) {
    res.status(400).send("Sua imagem do caixa está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarCaixa(idCaixa, nomeCaixa, enderecoCaixa, imagemCaixa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function adicionarLembrete(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var mensagemLembrete = req.body.mensagemLembreteServer;
  var dataHoraLembrete = req.body.dataHoraLembreteServer;
  var idUsuario = req.body.idUsuarioServer;
  // Faça as validações dos valores
  if (mensagemLembrete == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (dataHoraLembrete == undefined) {
    res.status(400).send("Seu endereço está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .adicionarLembrete(mensagemLembrete, dataHoraLembrete, idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function updatePerfil(req, res) {
  var id = req.body.idServer;
  var nome = req.body.nomeServer;
  var telefone = req.body.telefoneServer;
  var email = req.body.emailServer;
  var cep = req.body.cepServer;

  usuarioModel.updatePerfil(id, nome, telefone, email, cep).then((response) => {
    const tamanho = response.affectedRows;

    if (tamanho > 0) {
      res.json({
        mensagem: "success",
      });
    } else {
      res.json({
        mensagem: "error",
      });
    }
  });
}

function listarPerfil(req, res) {
  const idUser = req.params.id;

  usuarioModel
    .listarPerfil(idUser)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function listarLembrete(req, res) {
  const idUser = req.params.id;

  usuarioModel
    .listarLembrete(idUser)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function exibirFuncionarios(req, res) {
  usuarioModel
    .exibirFuncionarios()
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

function imgUsuario(req, res) {
  const idUser = req.params.id;

  usuarioModel
    .imgUsuario(idUser)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "Houve um erro ao realizar a consulta! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}
function atualizarImg(req, res) {
  const idUser = req.body.id;
  const img = req.body.img;

  usuarioModel.atualizarImg(idUser, img).then((response) => {
    const tamanho = response.affectedRows;

    if (tamanho > 0) {
      res.json({
        mensagem: "success",
      });
    } else {
      res.json({
        mensagem: "error",
      });
    }
  });
}

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  cadastrarFunc,
  cadastrarCaixa,
  updatePerfil,
  adicionarLembrete,
  listarPerfil,
  listarLembrete,
  exibirFuncionarios,
  imgUsuario,
  atualizarImg,
};
