var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar pontuacaoController.js
router.post("/cadastrar", function (req, res) {
    pontuacaoController.cadastrarPontuacao(req, res);
})

module.exports = router;