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
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var endereco = req.body.enderecoServer;
  var dataNasc = req.body.dataNascServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var senha = req.body.senhaServer;

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
      .cadastrar(nome, email, endereco, dataNasc, cpf, celular, senha)
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
  if (nomeCaixa == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (enderecoCaixa == undefined) {
    res.status(400).send("Seu endereço está undefined!");
  } else if (imagemCaixa == undefined) {
    res.status(400).send("Sua imagem do caixa está undefined!");
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

module.exports = {
  entrar,
  cadastrar,
  listar,
  testar,
  cadastrarFunc,
  cadastrarCaixa,
};
