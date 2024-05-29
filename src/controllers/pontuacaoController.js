var pontuacaoModel = require("../models/pontuacaoModel");

function cadastrarPontuacao(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var idUSuario = req.body.idUsuarioServer;
  var pontuacao = req.body.pontuacaoServer;

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  pontuacaoModel.cadastrarPontuacao(pontuacao, idUSuario)
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

module.exports = {
  cadastrarPontuacao
}
