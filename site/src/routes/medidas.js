var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/ram", function (req, res) {
    medidaController.eficienciaRam(req, res);
});

router.get("/cpu", function (req, res) {
    medidaController.eficienciaCpu(req, res);
});

router.get("/memoria", function (req, res) {
    medidaController.eficienciaMemoria(req, res);
});
module.exports = router;