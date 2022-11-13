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

function atualizarSenha(req, res) {
  const emailRedefinir = req.body.emailServer2;
  const senhaRedefinir = req.body.senhaServer2;

  usuarioModel
    .atualizarSenha(emailRedefinir, senhaRedefinir)
    .then((response) => {
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
        complementoEndereco
      )
      .then(function (resultado) {
        const tamanho = resultado.affectedRows;

        if (tamanho > 0) {
          usuarioModel.listarUser(cpf).then((response) => {
            const idUser = response[0].idUsuario;

            usuarioModel.lembreteDefault(idUser).then((resEffect) => {
              console.log(resEffect);
              res.json(resEffect);
            });
          });
        }
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
  var numFunc = req.body.numFuncServer;
  var complentoFunc = req.body.complementoFuncServer;
  var dataNascFunc = req.body.dataNascFuncServer;
  var cpf = req.body.cpfFuncServer;
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
        numFunc,
        complentoFunc,
        dataNascFunc,
        cpf,
        celularFunc,
        senhaFunc
      )
      .then(function (resultado) {
        const tamanho = resultado.affectedRows;

        if (tamanho > 0) {
          usuarioModel.listarUser(cpf).then((response) => {
            const idUser = response[0].idUsuario;

            usuarioModel.lembreteDefault(idUser).then((resEffect) => {
              console.log(resEffect);
              res.json(resEffect);
            });
          });
        }
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
  var numeroSerial = req.body.numeroSerialServer;
  var numero = req.body.numeroEnderecoServer;
  var complemento = req.body.complementoEnderecoServer;
  var pontoReferencia = req.body.pontoReferenciaEnderecoServer;

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
      .cadastrarCaixa(
        idCaixa,
        nomeCaixa,
        enderecoCaixa,
        imagemCaixa,
        numeroSerial,
        numero,
        complemento,
        pontoReferencia
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
  var numero = req.body.numeroEnderecoServer;
  var complemento = req.body.complementoServer;

  usuarioModel
    .updatePerfil(id, nome, telefone, email, cep, numero, complemento)
    .then((response) => {
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
  const usuarioIdentificador = req.params.id;
  usuarioModel
    .exibirFuncionarios(usuarioIdentificador)
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

function exibirQuantidadeTotalRam(req, res) {
  const usuarioIdentificador = req.params.id;
  usuarioModel
    .exibirQuantidadeTotalRam(usuarioIdentificador)
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

function exibirCaixas(req, res) {
  //const usuarioIdentificador = req.params.id;
  usuarioModel
    .exibirCaixas()
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

function exibirQtdTotalEtiquetas(req, res) {
  usuarioModel
    .exibirQtdTotalEtiquetas()
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

function exibirQtdHistorico(req, res) {
  //const usuarioIdentificador = req.params.id;
  usuarioModel
    .exibirQtdHistorico()
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

function listarCaixas(req, res) {
  // const usuarioIdentificador = req.params.id;
  usuarioModel
    .listarCaixas()
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

function listarHistorico(req, res) {
  // const usuarioIdentificador = req.params.id;
  usuarioModel
    .listarHistorico()
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

function pesquisarCaixa(req, res) {
  const caixa = req.params.idCaixa;

  usuarioModel
    .pesquisarCaixa(caixa)
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

function pesquisarHistorico(req, res) {
  const dataHora = req.params.dataHistorico;

  usuarioModel
    .pesquisarHistorico(dataHora)
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

function obterAlertasPorData(req, res) {
  const data = req.params.dataAlerta;

  usuarioModel
    .obterAlertasPorData(data)
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

function exibirQtdTotalAlertasDoDia(req, res) {
  const data = req.params.dataAtual;

  usuarioModel
    .exibirQtdTotalAlertasDoDia(data)
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

function exibirQtdTotalCaixasRam(req, res) {
  const data = req.params.dataAtual;

  usuarioModel
    .exibirQtdTotalCaixasRam(data)
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

function exibirQtdTotalCaixasCpu(req, res) {
  const data = req.params.dataAtual;

  usuarioModel
    .exibirQtdTotalCaixasCpu(data)
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

function exibirQtdTotalCaixasDisco(req, res) {
  const data = req.params.dataAtual;

  usuarioModel
    .exibirQtdTotalCaixasDisco(data)
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

/*------------------------ETIQUETAS-------------------------------------- */
function obterQtdAlertaRamLast30dias(req, res) {
  const idDoCaixa = req.params.idDoCaixa;

  usuarioModel
    .obterQtdAlertaRamLast30dias(idDoCaixa)
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

function obterQtdAlertaCpuLast30dias(req, res) {
  const idDoCaixa = req.params.idDoCaixa;

  usuarioModel
    .obterQtdAlertaCpuLast30dias(idDoCaixa)
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

function graficoUsoRam(req, res) {
  usuarioModel
    .graficoUsoRam()
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

function exibirEficienciaGlobalDoDia(req, res) {
  const data = req.params.dataAtual;

  usuarioModel
    .exibirEficienciaGlobalDoDia(data)
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

module.exports = {
  entrar,
  atualizarSenha,
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
  exibirQuantidadeTotalRam,
  exibirCaixas,
  exibirQtdTotalEtiquetas,
  listarCaixas,
  listarHistorico,
  imgUsuario,
  atualizarImg,
  pesquisarCaixa,
  pesquisarHistorico,
  exibirQtdHistorico,
  obterAlertasPorData,
  exibirQtdTotalAlertasDoDia,
  exibirQtdTotalCaixasRam,
  exibirQtdTotalCaixasCpu,
  exibirQtdTotalCaixasDisco,
  

  /*------------------------ETIQUETAS-------------------------------------- */
  obterQtdAlertaRamLast30dias,
  obterQtdAlertaCpuLast30dias,

  /*------------------------DASHBOARD-------------------------------------- */
  graficoUsoRam,
  exibirEficienciaGlobalDoDia,
};
