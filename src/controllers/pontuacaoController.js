var pontuacaoModel = require("../models/pontuacaoModel");

function cadastrarPontuacao(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var idUSuario = req.body.idUsuarioServer;
  var pontuacao = req.body.userScoreServer;
  var acertos = req.body.acertosServer;


  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  pontuacaoModel.cadastrarPontuacao(pontuacao, idUSuario, acertos)
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

function RankPontuacao(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  pontuacaoModel.RankPontuacao()
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

function dashboardAcertos(req, res) {
  pontuacaoModel.dashboardAcertos()
      .then(function (resultado) {
          if (resultado.length > 0) {
              res.status(200).json(resultado);
          } else {
              res.status(204).json(resultado);
          }
      }).catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  cadastrarPontuacao,
  RankPontuacao,
  dashboardAcertos
}
