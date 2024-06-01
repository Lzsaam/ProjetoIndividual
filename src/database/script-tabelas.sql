-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE ProjetoIndividual;

USE ProjetoIndividual;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

select * from usuario;

CREATE TABLE Resposta (
	idResposta INT PRIMARY KEY AUTO_INCREMENT,
    pontos INT,
    acertos INT,
	fkUsuario int, 
	foreign key (fkUsuario) REFERENCES usuario (id)
);



SELECT * FROM USUARIO
JOIN Resposta ON id = fkUsuario ORDER BY pontos DESC;

SELECT count(idResposta) FROM Resposta WHERE acertos = 0;
SELECT count(idResposta) FROM Resposta WHERE acertos = 1;
SELECT count(idResposta) FROM Resposta WHERE acertos = 2;
SELECT count(idResposta) FROM Resposta WHERE acertos = 3;
SELECT count(idResposta) FROM Resposta WHERE acertos = 4;
SELECT count(idResposta) FROM Resposta WHERE acertos = 5;
SELECT count(idResposta) FROM Resposta WHERE acertos = 6;
SELECT count(idResposta) FROM Resposta WHERE acertos = 7;
SELECT count(idResposta) FROM Resposta WHERE acertos = 8;
SELECT count(idResposta) FROM Resposta WHERE acertos = 9;
SELECT count(idResposta) FROM Resposta WHERE acertos = 10;

SELECT avg(Pontos) FROM Resposta JOIN usuario ON id = fkUsuario;

SELECT acertos, COUNT(idResposta) as count
FROM Resposta
GROUP BY acertos
ORDER BY acertos;

SELECT * FROM Resposta;











