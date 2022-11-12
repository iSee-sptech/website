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

router.post("/deletarCaixa1", function (req, res) {
  usuarioController.deletarCaixa1(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.entrar(req, res);
});

router.post("/updatePerfil", function (req, res) {
  usuarioController.updatePerfil(req, res);
});

router.post("/atualizarSenha", function (req, res) {
  usuarioController.atualizarSenha(req, res);
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

router.get("/exibirQuantidadeTotalRam", function (req, res) {
  usuarioController.exibirQuantidadeTotalRam(req, res);
});

router.get("/exibirCaixas", function (req, res) {
  usuarioController.exibirCaixas(req, res);
});

router.get("/exibirQtdTotalEtiquetas", function (req, res) {
  usuarioController.exibirQtdTotalEtiquetas(req, res);
});

router.get("/exibirQtdHistorico", function (req, res) {
  usuarioController.exibirQtdHistorico(req, res);
});

router.get("/pesquisarHistorico:dataHistorico", function (req, res) {
  usuarioController.pesquisarHistorico(req, res);
});

router.get("/pesquisarCaixa:idCaixa", function (req, res) {
  usuarioController.pesquisarCaixa(req, res);
});

router.get("/listarCaixas", function (req, res) {
  usuarioController.listarCaixas(req, res);
});

router.get("/listarHistorico", function (req, res) {
  usuarioController.listarHistorico(req, res);
});

router.get("/imgUsuario/:id", function (req, res) {
  usuarioController.imgUsuario(req, res);
});
router.post("/adicionarImagem", usuarioController.atualizarImg);

router.get("/obterAlertasPorData/:dataAlerta", function (req, res) {
  usuarioController.obterAlertasPorData(req, res);
});

router.get("/exibirQtdTotalAlertasDoDia/:dataAtual", function (req, res) {
  usuarioController.exibirQtdTotalAlertasDoDia(req, res);
});

router.get("/exibirQtdTotalCaixasRam/:dataAtual", function (req, res) {
  usuarioController.exibirQtdTotalCaixasRam(req, res);
});

router.get("/exibirQtdTotalCaixasCpu/:dataAtual", function (req, res) {
  usuarioController.exibirQtdTotalCaixasCpu(req, res);
});

router.get("/exibirQtdTotalCaixasDisco/:dataAtual", function (req, res) {
  usuarioController.exibirQtdTotalCaixasDisco(req, res);
});

/*------------------------ETIQUETAS-------------------------------------- */
router.get("/obterQtdAlertaRamLast30dias/:idDoCaixa", function (req, res) {
  usuarioController.obterQtdAlertaRamLast30dias(req, res);
});

router.get("/obterQtdAlertaCpuLast30dias/:idDoCaixa", function (req, res) {
  usuarioController.obterQtdAlertaCpuLast30dias(req, res);
});

router.get("/graficoUsoRam", function (req, res) {
  usuarioController.graficoUsoRam(req, res);
});

module.exports = router;
