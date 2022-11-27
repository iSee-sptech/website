var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
  medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real", function (req, res) {
  medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/ram", function (req, res) {
  medidaController.eficienciaRam(req, res);
});

router.get("/tempo-real-ram", function (req, res) {
  medidaController.medidasRam(req, res);
});

router.get("/cpu", function (req, res) {
  medidaController.eficienciaCpu(req, res);
});

router.get("/tempo-real-cpu", function (req, res) {
  medidaController.medidasCpu(req, res);
});

router.get("/memoria", function (req, res) {
  medidaController.eficienciaMemoria(req, res);
});

router.get("/tempo-real-memoria", function (req, res) {
  medidaController.medidasMemoria(req, res);
});

router.get("/eficiencia-pizza", function (req, res) {
  medidaController.medidasEficienciaPizza(req, res);
});

router.get("/ram-pizza", function (req, res) {
  medidaController.medidasRamPizza(req, res);
});

router.get("/cpu-pizza", function (req, res) {
  medidaController.medidasCpuPizza(req, res);
});

router.get("/memoria-pizza", function (req, res) {
  medidaController.medidasMemoriaPizza(req, res);
});
module.exports = router;
