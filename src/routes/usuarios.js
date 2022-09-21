var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
  usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
  usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/cadastrarFunc", function (req, res) {
  usuarioController.cadastrarFunc(req, res);
});

router.post("/cadastrarCaixa", function (req, res) {
  usuarioController.cadastrarCaixa(req, res);
});

router.post("/adicionarLembrete", function (req, res) {
  usuarioController.adicionarLembrete(req, res);
});


router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
});

router.post("/updatePerfil", function (req, res) {
  usuarioController.updatePerfil(req, res);
});

router.get("/listarPerfil/:id", function (req, res) {
  usuarioController.listarPerfil(req, res);
});

router.get("/listarLembrete/:id", function (req, res) {
  usuarioController.listarLembrete(req, res);
});

router.get("/exibirFuncionarios", function (req, res) {
  usuarioController.exibirFuncionarios(req, res);
});

module.exports = router;
